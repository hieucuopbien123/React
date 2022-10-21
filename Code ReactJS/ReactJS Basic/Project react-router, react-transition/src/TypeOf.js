// # Module html / Basic

function TypeOf(){
    var test = (
        <div>
            <marquee bgcolor="yellow" direction="up" height="100px">Hello</marquee>
            <marquee behavior="scroll" direction="up" scrollamount="1">Slow Scrolling</marquee>
            <marquee behavior="alternate" direction="right" scrollamount="12">Little Fast Scrolling</marquee>
            <marquee behavior="slide" direction="left" scrollamount="20">Fast Scrolling</marquee>
        </div>
    )
    console.log(test);
    //Khi ta viết code JSX, bản chất bên trong nó gọi React.createElement=> ta log nó ra là thấy 1 object 
    //có function createElement và các trường xác định component này. Tuy nhiên vấn đề là nó có $$typeof
    //kiểu Symbol
    return(
        <div>
            {test}
        </div>
    )
}
export default TypeOf;
