//dom.js

const CONSTANT = {
  cap: 'cap',
  isFirstLetterCapped: 'isFirstLetterCapped',
  isComponentCloseTag: 'isComponentCloseTag',
  isNotTag: 'isNotTag'
}

const componentTracker = {};

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
function normalizeNumberOrBoolean(paramValue){
  if (/^\d+$/.test(paramValue)) {
    return Number(paramValue);
  } else if (/^(true|false)$/.test(paramValue)) {
    paramValue = paramValue === 'true';
    return paramValue;
  }
  return paramValue;
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
      if(item === "/"){
        return;
      }
      extractedNonStructuredDataType[item] = true;
    } else {
      //just split first =
      const match = item.match(/([^=]+)=([^]*)/);
      // remove string ""
      let paramValue = (match[2] && match[2].replace(/^"([^]*)"$/, '$1'));
      extractedNonStructuredDataType[match[1]] = normalizeNumberOrBoolean(paramValue);
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

const parseChildrenComponents = function(extensibleStr, currentElement){
  const line = currentElement;
  const regularMatch = line.match(/<([^\s<>]+) ?([^<>]*)>/);
  const selfClosingMatch = line.match(/<([^\s<>]+) ?([^<>]*)\/>/);

  const node = regularMatch ? regularMatch : selfClosingMatch;
  const dependencies = {
    tagName: node[1], 
    props: convertAttributes(sanitizedString(node[2])), 
    children: selfClosingMatch ? '' : '__placeholder'
  };
  
  // if(componentTracker[dependencies.tagName]){
  //   throw(`A component like ${dependencies.tagName} can only call itself as a value of an event listener like onclick. It can not use a function that calls itself or calls itselfs outside of event listeners`);
  // }

  const component = normalizeHTML(callComponent(dependencies));

  const indexOfCurrentElement = extensibleStr.indexOf(currentElement);
  const result = component.split(/(<[^<>]+>)/);

  if(indexOfCurrentElement !== -1) {
    extensibleStr.splice(indexOfCurrentElement, 1, ...result);
    return extensibleStr;
  }
};
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
   let extensibleStr = str.split(pattern);
   const stack = [];
   let depth = 0;
   while (extensibleStr.length > depth ) {
    const currentElement = extensibleStr[depth]
    
      if(currentElement.trim() === '') {
        depth++
        continue;
      } 
      if(isComponent(currentElement)){
        extensibleStr = parseChildrenComponents(extensibleStr, currentElement);
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
      const paramName = matches[1].trim();
      let paramValue = normalizeNumberOrBoolean(matches[2].trim());
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
      const propName = normalizeNumberOrBoolean(match[1].trim());
      let propValue = normalizeNumberOrBoolean(match[2].trim());
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


//Todo:handle the situation when <Component></Component> has no attribute but has several arguments.
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

  if(componentArgs.length === 0 && Object.keys(attributes).length === 0) {
    return component();
  } else if(componentArgs.length === 1) {
    
    let prop = attributes[keys[0]];
    if(keys.length === 0) {
      const convertedProp = convertStringToParams(componentArgs.args);
      const key = Object.keys(convertedProp);
      prop = convertedProp[key];
    }

    const finalProp = /\{\s*\w+\s*\}/.test(componentArgs.args) ? attributes : prop;
    return component(finalProp);
  } else {
    if(componentArgs.length > 1 && Object.keys(attributes).length === 0){
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

// render.js
  /**
  * @desc Checking rendering environment
  * @param void
  * @returns boolean
  */
   const isBrowser = (_) => {
    // Check if the environment is Node.js
    if (typeof process === "object" &&
        typeof require === "function") {
        return false;
    }
    // Check if the environment is a
    // Service worker
    if (typeof importScripts === "function") {
        return false;
    }
    // Check if the environment is a Browser
    if (typeof window === "object") {
        return true;
    }
}

const _$ = document.querySelectorAll.bind(document);
const $select = (selectors) => _$(selectors); 

function isInitialLetterUppercase(func, context) {
  if(typeof func !== 'function') {
    throw(`Use ${context}(functionName, arg) instead of ${context}(funcationName(arg))`)
  }
  const initialLetter = func.name.charAt(0);
  return initialLetter === initialLetter.toUpperCase();
}

 /**
  * @desc renders component
  * @param component string
  * @returns string || void (mutates the DOM)
  */
function $render(component, arg) {
  try {
    componentTracker[component.name] = component.name
    if(!isInitialLetterUppercase(component, '$render')){
      throw('A component must start with a capital letter.')
    }

    if(isBrowser()){
      handleClientRendering(component, arg);
      return;
    }
    return processJSX(resolveComponent(component, arg));
  } catch (error) {
    throw(`Encountered an error: ${error}`)
  }
}
function resolveComponent(component, arg){
  // const key = component.name + JSON.stringify(arg);
  const resolvedComponent = arg ? component($purify(arg)) : component();
  // globalCache[key] = resolvedComponent;
  return resolvedComponent;
}
/**
  * @desc renders client component
  * @param component string
  * @returns void (mutates the DOM)
  */
  function handleClientRendering(component, arg){
    const parser = new DOMParser();
    const resolvedComponent = resolveComponent(component, arg)
    let processedComponent = processJSX(resolvedComponent);  
    const componentEl = parser.parseFromString(processedComponent, "text/html");
    const parsedComponent = componentEl.querySelector("body > div");
    
    if(!parsedComponent) {
      throw 'A component must be wrapped with a <div> tag (nothing else)';
    }

    if(parsedComponent.id === ""){
      throw 'A reRenderable component wrapping div must have an ID';
    }

    let el = $el(parsedComponent.id);
    if (el) {
      el.parentNode.replaceChild(parsedComponent, el);
    } else {
      useRoot(processedComponent);
    }
  }
function $register(...args) {
  const components = [...args];
  let depth = 0;
  
  while(components.length > depth){
    const component = components[depth];
    if(typeof component !== 'function') {
      throw('Only function is expected');
    }
    window[component.name] = component;
    depth++;
  }
  window['$render'] = $render;
  window['$trigger'] = $trigger;
  window['$select'] = $select;
  window['$purify'] = $purify;
  return true;
}

//Todo: refactor all the internal functions to indicate function where there is an error 
function $trigger(func, anchors, data){
  try {
    if(isObject(anchors) || Array.isArray(anchors)){
      throw('Selector(s) can only be passed as string');
    } else if(typeof func !== 'function'){
      throw('The first argument must be a function');
    } else if(!isBrowser()){
      throw('$trigger can only work in the browser');
    } else if(!anchors) {
      if(typeof func === 'function' && anchors === null){
        return func($purify(data));
      }
      return func();
    } 
    const selectors = anchors.split(',')
    
    let elements;
    if(selectors.length > 1) {
      elements = selectors.map(selector => {
        const nestedElements = _$(selector);
        const count = nestedElements.length;
        if(count > 1){
          return nestedElements;
        }
        return nestedElements[0];
      });
      
      const count = elements.length;
      if(count > 1){
        return func(elements, $purify(data));
      }
      return func(elements[0], $purify(data));
    } else if(selectors.length === 1){
      const nestedElements = _$(selectors);
      const count = nestedElements.length;
      if(count > 1){
        return func(nestedElements, $purify(data));
      }
      return func(nestedElements[0], $purify(data));  
    } 
  } catch (error) {
    throw(`${error} at ${func.name ? func.name : func}`)
  }
}
function $el(elementId) {
  return document.getElementById(elementId);
}

function useRoot(component) {
  document.getElementById("root").innerHTML = component;
}

function stringify(arrOrObj) {
  try {
    if(!arrOrObj && !Array.isArray(arrOrObj)) {
      return arrOrObj;
    }
    const data = JSON.stringify(arrOrObj);
    const sanitizedString = data
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    return `_9s35Ufa7M67wghwT_${sanitizedString}_9s35Ufa7M67wghwT_`;
  } catch (error) {
    throw(`Encountered an error: ${error}`)
  }
}

function convertToPropSystem(str){
  const regex = /_9s35Ufa7M67wghwT_([^]*?)_9s35Ufa7M67wghwT_/g;
  let match = regex.exec(str);
  if(match) {
    try {
      const parsedJSON = JSON.parse(match[1]);
      return parsedJSON;
    } catch (error) {
      // If parsing fails due to a SyntaxError, handle the error here
      console.error("Parsing Error:", error);
    }
  }
  return JSON.parse(str);
}

function $purify(props){
  try {
    if(isObject(props) || Array.isArray(props)) {
      return props;
    } else if(typeof props === 'string'){
      const isCrude = /_9s35Ufa7M67wghwT_/.test(props);
      if(!isCrude){
        return props;
      } 
    } else if (props === undefined) {
      return;
    }
    return convertToPropSystem(props);
  } catch (error) {
    throw(`Encountered an error: ${error}`)
  }
}

$register($render, $trigger, $select);
function isObject(value){
  return (
    typeof value === "object" && value !== null && !Array.isArray(value)
  );
};

export {
    $render,
    $register,
    stringify,
    $trigger}