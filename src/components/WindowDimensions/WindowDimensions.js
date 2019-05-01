// @flow
import { PureComponent } from 'react';

import { debounce } from '@utils';

type State = {
  windowWidth: number,
  windowHeight: number,
};

type Props = {
  children: (args: State) => React$Node,
};

class WindowDimensions extends PureComponent<Props, State> {
  state = {
    windowWidth: typeof window === 'undefined' ? 1280 : window.innerWidth,
    windowHeight: typeof window === 'undefined' ? 720 : window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  updateWindowSize = debounce(() => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }, 100);

  render() {
    return this.props.children(this.state);
  }
}

export default WindowDimensions;
