import React, {Component} from 'react';

export default class Board extends Component {
  constructor(props) {
    super(props);
  }

  drawBoard(ctx, board) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // clear the canvas
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.closePath();

    // vertical lines
    for(let i = 0; i < 2; i++) {
      const x = (width/3)*(1+i);
      ctx.beginPath();
      ctx.moveTo(x,0);
      ctx.lineTo(x,height);
      ctx.stroke();
      ctx.closePath();
    }

    // horizontal lines
    for(let i = 0; i < 2; i++) {
      const y = (height/3)*(1+i);
      ctx.beginPath();
      ctx.moveTo(0,y);
      ctx.lineTo(width,y);
      ctx.stroke();
      ctx.closePath();
    }

    for(let i = 0; i < 9; i++) {
      if(board[i] === 1) {
        // draw an X
        const x = (i%3) * (width/3);
        let y = 0;

        if(i < 3) {
          y = 0
        } else if(i >=3 && i < 6) {
          y = (height/3);
        } else {
          y = 2 * (height/3);
        }

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+(width/3),y+(height/3));
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(x+(width/3),y);
        ctx.lineTo(x,y+(height/3));
        ctx.stroke();
        ctx.closePath();

      } else if (board[i] === 2) {
        // draw an O
        const x = (i%3) * (width/3) + (width/6);
        let y = 0;

        if(i < 3) {
          y = (height/6);
        } else if(i >=3 && i < 6) {
          y = (height/3) + (height/6);
        } else {
          y = 2 * (height/3) + (height/6);
        }

        ctx.beginPath();
        ctx.moveTo(x+(height/6), y);
        ctx.arc(x, y, (width/6), 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  componentDidMount() {
    const {canvas} = this.refs;
    const {board} = this.props;
    const ctx = canvas.getContext('2d');
    this.drawBoard(ctx,board);

    this.setState({
      ctx: ctx
    });
  }

  componentWillReceiveProps(nextProps) {
    this.drawBoard(this.state.ctx, nextProps.board);
  }

  handleClick(e) {
    const {click} = this.props;
    const {ctx} = this.state;

    let x;
    let y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= ctx.canvas.offsetLeft;
    y -= ctx.canvas.offsetTop;

    click({
      coords: {
        x: x,
        y: y
      }
    })
  }

  render() {
    const {gameOver} = this.props;
    const {width, height} = this.props.dimensions;
    return (
      <canvas onClick={(e) => !gameOver ? this.handleClick(e) : {}}
      ref="canvas" width={width} height={height}
      style={{border: "1px solid black"}}></canvas>
    )
  }
}
