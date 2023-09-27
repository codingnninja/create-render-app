
const CONSTANT = {
  cap: 'cap',
  isFirstLetterCapped: 'isFirstLetterCapped',
  isComponentCloseTag: 'isComponentCloseTag',
  isNotTag: 'isNotTag'
}

 /**
 * remove script tag
 * @param str
 * @returns {string | * | void}
 */

 function removeScript(str){
   return str.replace(/<script[^>]*>([^]*?)<\/script>/g, '');
 }
 
  /**
 * normalize brackets
 * @param str
 * @returns {string | * | void}
 */

 function correctBracket(str) {
   return str.replace(/("[^<>\/"]*)<([^<>\/"]+)>([^<>\/"]*")/g, '"$1|$2|$3"');
 }
 
  /**
 * remove comment
 * @param str
 * @returns {string | * | void}
 */

 function removeComment(str) {
   return str.replace(/<!--[^>]*-->/g, '');
 }
 
 /**
  * remove break line
  * @param str
  * @returns {string | * | void}
  */
 function removeBreakLine(str) {
   return str.replace(/[\r\n\t]/g, '');
 }
 
 /**
  * get body if have
  * @param str
  * @returns {*}
  */
 function getBodyIfHave(str) {
   const match = str.match(/<body[^>]*>([^]*)<\/body>/);
   if (!match) {
     return str;
   }
   return match[1];
 }

  /**
 * Tag regex matchers
 * @param str
 * @returns {Boolean}
 */

 function isLine(property, line){
  let patterns = {
    cap: /[A-Z]/.test(line),
    self: /<([^\s<>]+) ?([^<>]*)\/>/.test(line),
    close: /<\/([^\s<>]+)>/.test(line),
    start: /<([^\s<>]+) ?([^<>]*)>/.test(line),
    text: /<(?:\/?[A-Za-z]+\b[^>]*>|!--.*?--)>/.test(line),
    isFirstLetterCapped: /<([A-Z][A-Za-z0-9]*)/.test(line),
    isComponentCloseTag: /<\/[A-Z][A-Za-z0-9]*>/.test(line),
    isNotTag: /^(?!<\w+\/?>$).+$/.test(line)
  }
  return patterns[property];
 }

 /**
  * node type
  * @type {{text: string, self: string, close: string, start: string}}
  */
  const NODE_TYPE = {
    text: 'text',
    self: 'self',
    close: 'close',
    // start or total
    start: 'start',
    element: 'element',
  };
 
/**
 * converts attributes to props
 * @param str
 * @returns {{}}
 */

 function convertAttributesToProps(str){
  const regex = /([\S]+=_9s35Ufa7M67wghwT_([^]*?)_9s35Ufa7M67wghwT_)/g;
  const matches = {};
  let match;

  while ((match = regex.exec(str)) !== null) {
    const extractedContent = match[1].match(/([^=]+)=([^]*)/);
    const value = extractedContent[2].match(/_9s35Ufa7M67wghwT_([^]*?)_9s35Ufa7M67wghwT_/);
    try {
      const parsedJSON = JSON.parse(value[1]);
      matches[extractedContent[1]] = parsedJSON;
    } catch (error) {
      // If parsing fails due to a SyntaxError, handle the error here
      console.error("Parsing Error:", error);
    }
  }
  return matches;
}

/**
 * handle attribute
 * @param str
 * @returns {{}}
 */
 function convertAttributes(str) {
  if (!str) {
    return {};
  }
  const extractedNonStructuredDataType = {}
  const extractedObjectAndArray = convertAttributesToProps(str);

  const _str = str.replace(/([\S]+=_9s35Ufa7M67wghwT_([^]*?)_9s35Ufa7M67wghwT_)/g, ' ');
  const arr = _str.replace(/[\s]+/g, ' ').trim().match(/([\S]+="[^"]*")|([^\s"]+)/g);

  arr.forEach((item) => {
    if (item.indexOf('=') === -1) {
      extractedNonStructuredDataType[item] = true;
    } else {
      //just split first =
      const match = item.match(/([^=]+)=([^]*)/);
      // remove string ""
      extractedNonStructuredDataType[match[1]] = (match[2] && match[2].replace(/^"([^]*)"$/, '$1'))
    }
  });

  const props = {
    ...extractedObjectAndArray, 
    ...extractedNonStructuredDataType}; 
  return props;
}

 /**
  * check for component
  * @param str
  * @returns boolean
  */
 function isComponent(line){
  if(!isLine(CONSTANT.isFirstLetterCapped, line)){
    return false;
  }
  return true;
 }

 /**
 * Normalize html tags
 * @param str
 * @returns {string | * | void}
 */
function normalizeHTML(str){
  return correctBracket(
    getBodyIfHave(
      removeBreakLine(
        removeComment(
          removeScript(str)
        )
      )
    )
  );
}

 /**
 * sanitizes string
 * @param str
 * @returns {string | * | void}
 */
function sanitizedString(str) {
  const _str = str.replace(/&amp;/g, '&')
     .replace(/&lt;/g, '<')
     .replace(/&gt;/g, '>')
     .replace(/&quot;/g, '"')
     .replace(/&#x27;/g, "'")
     .replace(/&#x2F;/g, '\/');
  return _str;
}

 /**
  * parses html and jsx
  * @param str
  * @returns {*}
  */
 function parseChildren (str) {
   const pattern = /(<[^<>]+>)/;
   if (!str) {
     return null;
   }
   const extensibleStr = str.split(pattern);
   const stack = [];
   let depth = 0;
   while (extensibleStr.length > depth ) {
    const currentElement = extensibleStr[depth]
    
      if(currentElement.trim() === '') {
        depth++
        continue;
      } 
    
      if(isComponent(currentElement)){
        const line = currentElement;
        const regularMatch = line.match(/<([^\s<>]+) ?([^<>]*)>/);
        const selfClosingMatch = line.match(/<([^\s<>]+) ?([^<>]*)\/>/);

        const node = regularMatch ? regularMatch : selfClosingMatch;
        const dependencies = {
          tagName: node[1], 
          props: convertAttributes(sanitizedString(node[2])), 
          children: selfClosingMatch ? '' : '__placeholder'
        }
        
        const component = normalizeHTML(callComponent(dependencies));
        const indexOfCurrentElement = extensibleStr.indexOf(currentElement);
        const result = component.split(/(<[^<>]+>)/);

        if(indexOfCurrentElement !== -1) {
          extensibleStr.splice(indexOfCurrentElement, 1, ...result);
        }
      
      } else {
        stack.push(currentElement);
        depth++;
      }
    }

    let html = ``;
    if (stack.length > 0) {
      stack.forEach((node, index) => {
        // text node
        if(isLine(NODE_TYPE.close, node)) {
          if(isLine(CONSTANT.isComponentCloseTag, node)) {
            html+='</div>';
          } else if(!isLine(CONSTANT.isFirstLetterCapped, node) && stack[index - 1] === '__placeholder'){
            html+='';
          } else if(!isLine(CONSTANT.isFirstLetterCapped, node) && stack[index - 1].trim() !== '__placeholder'){
            html+=node;
          } 
          // html+=node;
        } else if(node.trim() === ","){
          html+="";
        } else if(isLine(NODE_TYPE.start, node)) {
          html += node;
        } else if(isLine(CONSTANT.isNotTag, node) && node.trim() !== '__placeholder') {
          html += node;
        }
      });
    }
    return html;
  };
 
   /**
 * memoizes functions
 * @param fn
 * @returns {function}
 */
  function memoize(fn) {

    const cache = {};
    return function (...args){
     const key = JSON.stringify(args);
     if (cache[key]) {
       return cache[key];
     }
 
     const result = fn(...args);
     cache[key] = result;
     return result;    
   } 
 }
 /**
 * figures argument length of a function
 * @param function
 * @returns {obj}
 */
 function getArgsLength(component) {
  // Extract the arguments using regex
  const argsRegex = /function\s*\w*\s*\((.*?)\)|\((.*?)\)|\((.*?)\)\s*=>/;
  const match = component.match(argsRegex);

  let args = [];
  if (match) {
    const argsString = match[1] || match[2];
    if(match[1] === "") { return {length: 0}};
    args = argsString.split(',').map(arg => arg.trim());
  }

  if (args.length === 1) {
    return {length: 1, args}
  }
  return {length: args.length, args};
}

 /**
 * string to parameters
 * @param str
 * @returns {obj}
 */
function convertStringToParams(string) {
  const regex = /(\w+)\s*=\s*(.*?)(?=\s*(?:,|$))/g;
  const parameterObj = {};

  let matches;
  while ((matches = regex.exec(string)) !== null) {
    const paramName = matches[1];
    let paramValue = matches[2];

    parameterObj[paramName] = paramValue;
  }

  return parameterObj;
}

 /**
 * string to obj
 * @param str
 * @returns {obj}
 */

function convertStringToObj(str) {
  const obj = {};

  const regex = /(\w+)\s*:\s*([^,}]+)/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const propName = match[1].trim();
    let propValue = match[2].trim();

    if (/^\d+$/.test(propValue)) {
      propValue = Number(propValue);
    } else if (/^(true|false)$/.test(propValue)) {
      propValue = propValue === 'true';
    }

    obj[propName] = propValue;
  }
  return obj;
}

 /**
 * gets function with a tag name
 * @param element
 * @returns {function}
 */

function resolveFunction(element){
  const fn = Function(`return ${element.tagName}`)(); 

  if (typeof fn !== "function") {
    throw TypeError('This component is not defined');
  }

  return fn;
}

 /**
 * organizes props to pass it as an argument to a component
 * @param str
 * @returns {function}
 */

const callComponent = memoize(function(element) {
  const component = resolveFunction(element);

  const componentArgs = getArgsLength(component.toString());
  const children = element.children;
  let attributes = element.props;
  const keys = Object.keys(attributes);

  if(componentArgs.length === 0) {
    return component();
  } else if(componentArgs.length === 1 && !children) {
    
    let prop = attributes[keys[0]];
    if(attributes[keys[0]] === true) {
      const convertedProp = convertStringToParams(componentArgs.args);
      const key = Object.keys(convertedProp);
      prop = convertedProp[key];
    }

    const finalProp = /\{\s*\w+\s*\}/.test(componentArgs.args) ? attributes : prop;
    return component(finalProp);
  } else {
    if(componentArgs.length > 1 && attributes[keys[0]] === true){
      const regex = /{([^}]+)}/;
      
      let attributesString = componentArgs.args.join(",");
      const match = attributesString.match(regex);
      attributes = convertStringToObj(match[0]);      
    }   
    const props = { ...attributes, children }; 
    return component(props);
  } 
});

 /**
  * Main processor to process JSX from html
  * @param str
  * @constructor
  */
 const processJSX = memoize(function (str) {
   let _str = str || '';
   _str = normalizeHTML(_str);
   return parseChildren(_str);
 });

/**
  * @desc renders server component
  * @param component string
  * @returns string
  */
function $render(component, arg){
  try {
    const resolvedComponent= arg ? component($purify(arg)) : component;
    let processedComponent = processJSX(resolvedComponent);   
    return processedComponent;
  } catch (error) {
    throw(`Encountered an error: ${error}`)
  } 
}

