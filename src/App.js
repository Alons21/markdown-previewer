import React from 'react';
import './App.css';
import marked from 'marked';
import { FaRegWindowMaximize } from "react-icons/fa";
import { FaRegWindowMinimize } from "react-icons/fa";

let placeholderMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
const NONE = 0;
const EDITOR = 1;
const PREVIEW = 2;
class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      input: placeholderMarkdown,
      maximizedWindow: NONE,
    };
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;

    document.body.appendChild(script);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }
  getMarkdownText() {
    var rawMarkup = marked(this.state.input, {sanitize: true});
    return { __html: rawMarkup };
  }
  changeWindows(target) {
    this.setState({
      maximizedWindow: target,
    })
  }
  render() {
    return (
      <div id="app-wrapper" style={{"grid-template-columns": this.state.maximizedWindow !== NONE?"100%":"50% 50%"}}>
        <div id="editor-wrapper" style={{"display": this.state.maximizedWindow === PREVIEW && "none"}}>
          <div className="nav-bar">
            <p>Editor</p>
            {this.state.maximizedWindow === EDITOR ? <FaRegWindowMinimize className="window-mode"
             size={18} color="black" onClick={() => this.changeWindows(NONE)}/> :
              <FaRegWindowMaximize className="window-mode" onClick={() => this.changeWindows(EDITOR)}
             size={18} color="black"/>}      
          </div>
          <textarea 
          id="editor"
          value={this.state.input}
          onChange={this.handleChange}/>
        </div>
        <div id="preview-wrapper" style={{"display": this.state.maximizedWindow === EDITOR && "none"}}>
          <div className="nav-bar">
            <p>Preview</p>
            {this.state.maximizedWindow === PREVIEW ? <FaRegWindowMinimize className="window-mode"
             size={18} color="black" onClick={() => this.changeWindows(NONE)}/> : <FaRegWindowMaximize className="window-mode"
    size={18} color="black" onClick={() => this.changeWindows(PREVIEW)}/>}     
          </div>
          <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()}/>
        </div>
      </div>
    )
  }
}

export default App;
