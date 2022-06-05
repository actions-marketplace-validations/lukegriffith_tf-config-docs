'use strict';

var modules, index

// data

const request = async () => {
    const index = await fetch('data/index')
        .then(response => response.json());
    console.log(Reflect.ownKeys(index))
    Reflect.ownKeys(index).forEach(key => { 
        console.log(key)
        fetch(`data/${key}`)
            .then(response => response.json())
            .then(data => console.log(data))
    })

}

request()


// react

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
        return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));