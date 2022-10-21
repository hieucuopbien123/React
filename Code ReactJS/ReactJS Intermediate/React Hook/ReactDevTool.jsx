const TextContext = React.createContext();
TextContext.displayName = 'TextContext';
//devtool có thể bắt realtime props, state. VD: App bên dưới có thể bắt được realtime props của nó ở phần hook
//khi nhập giá trị vào textarea

function App() {
    const [text, setText] = React.useState('');

    return(
        <TextContext.Provider value={text}>
            <div>
                <label htmlFor="text">
                    Add Your Text Here:
                    <br/>
                    <textarea
                        id="text"
                        name="text"
                        rows="10"
                        cols="100"
                        onChange={e => setText(e.target.value)}
                    >
                    </textarea>
                </label>
            </div>
        </TextContext.Provider>
    )
}
ReactDOM.render(<App/>, document.getElementById("devtool"));
