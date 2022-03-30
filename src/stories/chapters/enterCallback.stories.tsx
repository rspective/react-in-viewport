import { Fragment } from 'react';

import { action } from '@storybook/addon-actions';
import omit from 'lodash/omit';

import handleViewport, { customProps } from '../../index'; // eslint-disable-line import/no-named-as-default
import { Block, PageTitle, Spacer } from '../common/themeComponent';

const ViewportBlock = handleViewport(Block, {}, { disconnectOnLeave: false });
const CustomAnchor = ({ forwardedRef, inViewport, ...restProps }) => {
  const text = inViewport ? 'Link (in viewport)' : 'Link (not in viewport)';
  return (
    <a
      href="https://github.com/roderickhsiao/react-in-viewport#readme"
      {...omit(restProps, customProps)}
      ref={forwardedRef}
      style={{ padding: '20px 0' }}
    >
      {text}
    </a>
  );
};
const ViewportAnchor = handleViewport(
  CustomAnchor,
  {},
  { disconnectOnLeave: false }
);

export default {
  title: 'Enter Callback',
  component: ViewportBlock,
  decorators: [
    (Story: React.ElementType) => (
      <Fragment>
        <PageTitle />
        <Spacer />
        <div style={{ padding: '20px', maxWidth: '400px' }}>
          <Story />
        </div>
      </Fragment>
    ),
  ],
};

export const ClassBaseComponent = () => (
  <ViewportBlock
    className="card"
    onEnterViewport={() => action('callback')('onEnterViewport')}
    onLeaveViewport={() => action('callback')('onLeaveViewport')}
  />
);

export const FunctionalComponent = () => (
  <ViewportAnchor
    onEnterViewport={() => action('callback')('onEnterViewport')}
    onLeaveViewport={() => action('callback')('onLeaveViewport')}
  />
);
