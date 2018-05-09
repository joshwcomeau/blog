import React from 'react';

import { COLORS } from '../../../constants';

import BlogPostTemplate from '../../../templates/BlogPost';
import Paragraph from '../../../components/Paragraph';
import Heading from '../../../components/Heading';
import InlineCode from '../../../components/InlineCode';
import Divider from '../../../components/Divider';
import Link from '../../../components/Link';
import SingleAxisDemo from '../../../components/SingleAxisDemo';
import LiveEditableCode from '../../../components/LiveEditableCode';
import Info from '../../../components/Info';
import MouseTracker from './MouseTracker';
import InitialCurve from './InitialCurve';
import BezierController from './BezierController';

export const FRONT_MATTER = {
  title: 'Dynamic Bézier Curves',
  slug: 'dynamic-bezier-curves',
  published: false,
  publishedOn: '2018-05-29',
  heroStyle: 'watermelon-gradient',
  heroImage: null,
  heroBackground: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
  heroTitleGradientSteps: ['80deg', COLORS.pink[500], COLORS.purple[700]],
  abstract:
    "Learn how to fold up the DOM like origami. We'll look at how to create Flipboard-like folding UI, and how to abstract that into generalized, reusable React components.",
};

const SectionHeading = ({ style = {}, ...delegated }) => (
  <Heading
    size={3}
    style={{ ...style, color: COLORS.pink[500] }}
    {...delegated}
  />
);

const CODE_SAMPLES = [
  `\
const rectangle = (
  <rect
    x={40} y={15}
    width={30} height={65}
    fill="hotpink"
  />
);
const circle = (
  <ellipse
    cx={30} cy={60}
    rx={20} ry={20}
    fill="lightsalmon"
  />
);
const triangle = (
  <polygon
    points="15,80 30,55 45,80"
    fill="turquoise"
  />
);

render(
  <svg
    style={{ background: '#333' }}
    viewBox="0 0 80 80"
  >
    {rectangle}
    {circle}
    {triangle}
  </svg>
)
`,
  `\
const shape = (
  <svg viewBox="0 0 300 300">
    <path
      d={\`
        M 100,100
        L 200,100
        L 200,200
        L 100,200
      \`}
      fill="hotpink"
    />
  </svg>
);

render(shape);
`,
];

export default () => (
  <BlogPostTemplate {...FRONT_MATTER}>
    <Paragraph>
      Maybe it's the aspiring designer in me, but I find the process of
      sketching out rough mockups at the start of a new project incredibly
      exciting.
    </Paragraph>

    <Paragraph>
      For this blog, I thought it'd be cool if the hero image had a swoopy,
      curvy bottom edge, as a way of making the hero feel less traditional. My
      partner pointed out that it would be cool if the curve flattened out as
      the user scrolled down; not only would this look swanky, but by pulling
      the curve up and out of the way, it would draw focus towards the text, and
      lead to a cleaner reading experience.
    </Paragraph>

    <Paragraph>
      The only problem was that I hadn't really worked with Bezier curves
      before. Sure, I was comfortable with basic SVG shapes like lines and
      polygons... but curves felt like a next-level challenge. Polygons just
      need some trigonometry, but curves require calculus, and I never learned
      calculus.
    </Paragraph>

    <Paragraph>
      Surprisingly (to me, at least), it turns out that I didn't need to learn
      anything about derivatives. Bézier curves aren't that intimidating once
      you understand how they work!
    </Paragraph>

    <Paragraph>
      This blog post is an intro to SVG Bézier curves, wherein we learn how to
      create dynamic curves that respond to user input:
    </Paragraph>

    <SingleAxisDemo showNote={true}>
      {value => (
        <InitialCurve percentStraightened={value} color={COLORS.pink[500]} />
      )}
    </SingleAxisDemo>

    <Divider />

    <SectionHeading anchorId="understanding-svg-paths">
      Understanding SVG Paths
    </SectionHeading>

    <Paragraph>
      When you first learn to work with SVGs, you'll often use shape elements,
      like <InlineCode>{'<rect>'}</InlineCode> or{' '}
      <InlineCode>{'<ellipse>'}</InlineCode>.
    </Paragraph>

    <LiveEditableCode code={CODE_SAMPLES[0]} split={[50, 50]} maxHeight={530} />

    <Paragraph>
      These shapes are straightforward and declarative, but that simplicity
      comes at the cost of flexibility; you can't express "unusual" shapes like
      a curved line.
    </Paragraph>

    <Paragraph>
      To do neat curvy things, we need to use the{' '}
      <InlineCode>{'<path>'}</InlineCode> element. This swiss-army-knife of an
      SVG primitive lets you specify a sequence of steps to execute, in a
      seemingly-inscrutable bundle of letters and numbers:
    </Paragraph>

    <LiveEditableCode code={CODE_SAMPLES[1]} />

    <Info type="note">
      If you're not already comfortable with SVG, you may find it useful to go
      through{' '}
      <Link
        external
        theme="light"
        href="https://www.w3schools.com/graphics/svg_intro.asp"
      >
        the W3Schools tutorial
      </Link>. While implementing this technique won't require additional SVG
      knowledge, you'll feel more comfortable tweaking and expanding the
      examples provided if you're armed with general SVG knowhow.
    </Info>

    <Paragraph>
      The <InlineCode>path</InlineCode> element gives us access to Bézier curves
      through the Q and C commands.
    </Paragraph>

    <BezierController />
  </BlogPostTemplate>
);
