import React from 'react';

import { COLORS } from '../../../constants';

import BlogPostTemplate from '../../../templates/BlogPost';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Heading from '../../../components/Heading';
import Divider from '../../../components/Divider';
import TextLink from '../../../components/TextLink';
import Em from '../../../components/Em';
import Spacer from '../../../components/Spacer';

export const FRONT_MATTER = {
  title: 'The Case for Whimsy',
  slug: 'the-case-for-whimsy',
  published: false,
  publishedOn: '2018-05-17',
  heroStyle: 'watermelon-gradient',
  heroImage: null,
  heroBackground: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
  heroTitleGradientSteps: ['80deg', COLORS.pink[500], COLORS.purple[700]],
  abstract: 'Resources from my React Europe 2018 talk, "The Case for Whimsy".',
};

const SectionHeading = ({ style = {}, ...delegated }) => (
  <Heading
    size={3}
    style={{ ...style, color: COLORS.pink[500] }}
    {...delegated}
  />
);

const SubHeading = ({ style = {}, ...delegated }) => (
  <Heading
    size={4}
    style={{ ...style, color: COLORS.purple[700] }}
    {...delegated}
  />
);

export default () => (
  <BlogPostTemplate {...FRONT_MATTER}>
    <Paragraph>
      At React Europe in 2018, I delivered a talk all about how to make the
      internet more whimsical. This post serves as a collection for all relevent
      information/resources.
    </Paragraph>

    <SectionHeading>Recording</SectionHeading>

    <Paragraph>(coming soon)</Paragraph>

    <SectionHeading>Slides</SectionHeading>

    <Paragraph>
      Slides can be found at{' '}
      <TextLink external href="https://the-case-for-whimsy.surge.sh">
        the-case-for-whimsy.surge.sh
      </TextLink>{' '}
      . You can also view it in{' '}
      <TextLink external href="https://the-case-for-whimsy.surge.sh?presenter">
        presenter mode
      </TextLink>{' '}
      to see my notes, although I make no guarantees as to their helpfulness.
    </Paragraph>

    <Paragraph>
      The code slides are all available in the project's{' '}
      <TextLink
        external
        href="https://github.com/joshwcomeau/react-europe-talk-2018/tree/master/src/code"
      >
        GitHub repo
      </TextLink>.
    </Paragraph>

    <SectionHeading>Confetti</SectionHeading>

    <Paragraph>
      The confetti used in the presentation can be found{' '}
      <TextLink
        external
        href="https://github.com/joshwcomeau/react-europe-talk-2018/blob/master/src/components/Confetti/Confetti.js"
      >
        here
      </TextLink>. This version leverages the React lifecycle to manage its
      animation loop.
    </Paragraph>

    <Paragraph>
      The version we use at Khan Academy uses a few optimizations to really make
      sure confetti runs smoothly on lower-end devices. To be clear, the
      difference between the two versions is pretty small; React's lifecycle is
      surprisingly lightweight on simple DOM trees like this. The "unoptimized"
      one still runs smoothly on a $150 chromebook.
    </Paragraph>

    <Paragraph>
      An optimized version similar to the one used at Khan Academy can be found{' '}
      <TextLink
        external
        href="https://github.com/joshwcomeau/react-europe-talk-2018/blob/master/src/components/Confetti/Confetti.optimized.js"
      >
        here
      </TextLink>.
    </Paragraph>

    <SectionHeading>Whimsical Mail Client</SectionHeading>

    <Paragraph>
      The talk features a fictional, heavily-animated mail client. You can{' '}
      <TextLink external href="https://whimsical-mail-client.surge.sh">
        play with the demo
      </TextLink>{' '}
      or{' '}
      <TextLink
        external
        href="https://github.com/joshwcomeau/whimsical-mail-client"
      >
        view its source-code
      </TextLink>, although be warned:
    </Paragraph>

    <List>
      <ListItem>
        Most features don't work, and there may be bugs if you do anything
        except the expected happy-path. It's not a real application.
      </ListItem>
      <ListItem>
        I had meant to take time to tidy up the code, but time got away from me
        😅 it may be useful as inspiration, but it is not production-ready.
      </ListItem>
    </List>
  </BlogPostTemplate>
);
