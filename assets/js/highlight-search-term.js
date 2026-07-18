/**
 * This file is a modified version of:
 * https://github.com/marmelab/highlight-search-term/blob/main/src/index.js
 * - We return the `nonMatchingElements`
 * - We fixed a bug: `getRangesForSearchTermInElement` got the `node.parentElement`, which is not working if there are multiple text nodes in one element.
 *
 * highlight-search-term is published under MIT License.
 *
 * MIT License
 *
 * Copyright (c) 2024 marmelab
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const highlightSearchTerm=({search:e,selector:t,customHighlightName:r="search"})=>{if(!t)throw new Error("The selector argument is required");if(!CSS.highlights)return;if(CSS.highlights.delete(r),!e)return;const n=[],o=[],h=document.querySelectorAll(t);if(Array.from(h).map(t=>{let r=!1;getTextNodesInElementContainingText(t,e).forEach(t=>{const o=getRangesForSearchTermInNode(t,e);n.push(...o),o.length>0&&(r=!0)}),r||o.push(t)}),0===n.length)return o;const s=new Highlight(...n);return CSS.highlights.set(r,s),o},getTextNodesInElementContainingText=(e,t)=>{const r=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let o;for(;o=n.nextNode();)o.textContent&&o.textContent.toLowerCase().includes(t.toLowerCase())&&r.push(o);return r},getRangesForSearchTermInNode=(e,t)=>{const r=[],n=(e.textContent?e.textContent.toLowerCase():"")||"";let o,h=0;for(;(o=n.indexOf(t.toLowerCase(),h))>=0;){const n=new Range;n.setStart(e,o),n.setEnd(e,o+t.length),r.push(n),h=o+t.length}return r};export{highlightSearchTerm};