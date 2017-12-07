# React In Viewport Component
[![npm version](https://badge.fury.io/js/react-aspect-ratio.svg)](http://badge.fury.io/js/react-in-viewport)

Wrapper component to detect if the component is in viewport.
Use [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

Dependencies: [Intersection Observer Polyfills](https://www.npmjs.com/package/intersection-observer)

## Usages

Wrap your component with handleViewport HOC, you will receive
1. `inViewport` props indicating the component is in viewport or not.

`handleViewport` HOC accepts three params, the first one is your component and the second param is the option you want to pass to [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

The third `config` param
1. `config.disconnectOnLeave { Boolean }` disconnect intersection observer after leave

The HOC preserve `onEnterViewport` and `onLeaveViewport` props as a callback

*NOTE*: Stateless: Need to add `ref={this.props.innerRef}` on your component

```javascript
import handleViewport from 'react-in-viewport';

const Block = (props: { inViewport: boolean }) => {
  const { inViewport, innerRef } = props;
  const color = inViewport ? '#217ac0' : '#ff9800';
  const text = inViewport ? 'In viewport' : 'Not in viewport';
  return (
    <div className="viewport-block" ref={innerRef}>
      <h3>{ text }</h3>
      <div style={{ width: '400px', height: '300px', background: color }} />
    </div>
  );
};
const ViewportBlock = handleViewport(Block, /** options: {}, config: {} **/);

const Component = (props) => (
  <div>
    <div style={{ height: '100vh' }}>
      <h2>Scroll down to make component in viewport</h2>
    </div>
    <ViewportBlock onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />
  </div>
))
```
