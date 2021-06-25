interface DirectiveArrayItem {
  name: string;
  options: any;
}
const directiveArray: DirectiveArrayItem[] = [];
function directive(name: string, fn: Function): void {
  directiveArray.push({
    name: name,
    options: fn(),
  });
}

function compile(element: Element, scope: any): void {
  if (element.nodeType === 3) {
    element.nodeValue = element.nodeValue?.replace(/\{\{([^\}]*)\}\}/g, ($0, $1) => {
      let value = parse($1, scope);
      if (typeof value === "object") {
        value = JSON.stringify(value, null, 2);
      }
      return value;
    });
  }
  if (element.attributes) {
    directiveArray.map((directive) => {
      if (element.getAttribute(directive.name) && element.parentNode) {
        directive.options.link(scope, element, element.attributes);
      }
    });
  }
  for (let child of element.childNodes) {
    compile(child as HTMLElement, scope);
  }
}
function value(data: any, attributes: string): any {
  if (attributes === "true") {
    return true;
  }
  if (attributes === "false") {
    return false;
  }
  if (typeof data[attributes] !== "undefined") {
    return data[attributes];
  }
  const dotIndex = attributes.indexOf(".");
  if (dotIndex > -1) {
    const key = attributes.substr(0, dotIndex);
    attributes = attributes.substr(dotIndex + 1);
    if (typeof data[key] !== "undefined") {
      return value(data[key], attributes);
    }
  }
  return "";
}
function parse(content: string, scope: any): string {
  content = content.replace(/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g, (value) => {
    return `value(scope,'${value.trim()}')`;
  });
  return new Function("value", `return (scope)=>${content}`)(value)(scope);
}
function Template(content: string, data: any): string {
  directive("html", () => {
    return {
      priority: 9,
      link: (scope: any, element: HTMLElement) => {
        const attribute: string = element.getAttribute("html") ?? "";
        const expression: string = parse(attribute, scope);
        if (expression) {
          element.innerHTML = expression;
        }
      },
    };
  });
  directive("text", () => {
    return {
      priority: 9,
      link: (scope: any, element: HTMLElement) => {
        const attribute: string = element.getAttribute("text") ?? "";
        const expression: string = parse(attribute, scope);
        if (expression) {
          element.innerText = expression;
        }
      },
    };
  });
  directive(":class", () => {
    return {
      link: (scope: any, element: HTMLElement) => {
        const attribute: string = element.getAttribute(":class") ?? "";
        const tokens: Array<string> = attribute.split("|");
        const classArray: Array<string> = [];
        for (const token of tokens) {
          const item = token.split(":");
          const expression = parse(item[1], scope);
          if (expression) {
            classArray.push(item[0]);
          }
        }
        element.classList.add(...classArray);
        element.removeAttribute(":class");
      },
    };
  });

  directive("for", () => {
    return {
      priority: 10,
      link: (scope: any, element: HTMLElement) => {
        let attribute: string = element.getAttribute("for") ?? "";
        if (!attribute.includes(" in ")) {
          return;
        }
        let itemName = "";
        let valueName = "";
        let trackName = "$index";
        attribute = attribute.replace(/\s+by\s+([^\s]+)$/, function(item, $1) {
          if ($1) {
            trackName = ($1 || "").trim();
          }
          return "";
        });

        const inReg = /([^\s]+)\s+in\s+([^\s]+)|\(([^,]+)\s*,\s*([^)]+)\)\s+in\s+([^\s]+)/;

        const r = inReg.exec(attribute);
        if (r) {
          if (r[1] && r[2]) {
            itemName = (r[1] || "").trim();
            valueName = (r[2] || "").trim();
            if (!(itemName && valueName)) {
              return;
            }
          } else if (r[3] && r[4] && r[5]) {
            trackName = (r[3] || "").trim();
            itemName = (r[4] || "").trim();
            valueName = (r[5] || "").trim();
          }
        } else {
          return;
        }

        const forTarget = value(scope, valueName) || [];
        const forFunc = (i: string | number) => {
          const itemNode = element.cloneNode(true) as HTMLElement;
          const itemScope: { [key: string]: any } = {};
          itemScope[trackName] = i;
          itemScope[itemName] = forTarget[i];
          itemScope.__proto__ = scope;
          element.parentNode.insertBefore(itemNode, element);
          compile(itemNode, itemScope);
        };
        element.removeAttribute("for");
        if ("length" in forTarget) {
          for (let i = 0; i < forTarget.length; i++) {
            forFunc(i);
          }
        } else{
          for (const i in forTarget) {
            if (forTarget.hasOwnProperty(i)) {
              forFunc(i);
            }
          }
        }
        element.parentNode.removeChild(element);
      },
    };
  });

  directive("if", () => {
    return {
      priority: 9,
      link: (scope: any, element: HTMLElement) => {
        const attribute: string = element.getAttribute("if");
        const nextElement: Element = element.nextElementSibling;
        if (!parse(attribute, scope)) {
          element.parentNode && element.parentNode.removeChild(element);
        } else {
          const hasElse: boolean = nextElement ?? nextElement.getAttribute("else") != undefined ? true : false;
          if (hasElse) {
            nextElement.parentNode && nextElement.parentNode.removeChild(nextElement);
          }
        }
      },
    };
  });
  directiveArray.sort(function(b, a) {
    return Number(a.options.priority || 0) - Number(b.options.priority || 0);
  });
  const div: HTMLElement = document.createElement("div");
  div.innerHTML = content;
  for (let child of div.childNodes) {
    compile(child as HTMLElement, data);
  }
  return div.innerHTML;
}
export default Template;