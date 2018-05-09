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

import basicShapesCode from './code/basic-shapes.example';
import pathIntroCode from './code/path-intro.example';

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
      This blog post is an intro to working with Bézier curves with React.js.
      We'll learn how to build dynamic curves that respond to user input:
    </Paragraph>

    <SingleAxisDemo showNote={true}>
      {value => (
        <InitialCurve percentStraightened={value} color={COLORS.pink[500]} />
      )}
    </SingleAxisDemo>

    <Divider />

    <SectionHeading anchorId="understanding-svg-paths">
      A Quick SVG Refresher
    </SectionHeading>

    <Paragraph>
      For achieving this effect, we'll use SVG. We could also use HTML Canvas, but SVG is easier to work with, and more accessible+.
    </Paragraph>

    <Paragraph>
      While doing a deep dive into SVG is beyond the scope of this post (I'd recommend the <Link
        external
        href="https://www.w3schools.com/graphics/svg_intro.asp"
      >
        W3Schools tutorial
      </Link> for that), we'll cover the basics, and show how to create our Bézier curve from scratch. Experienced SVG-ers can jump to [link needed].
    </Paragraph>

    <Paragraph>
      The simplest form of SVG drawings use shape elements,
      like <InlineCode>{'<rect>'}</InlineCode> or{' '}
      <InlineCode>{'<ellipse>'}</InlineCode>.
    </Paragraph>

    <LiveEditableCode code={basicShapesCode} split={[50, 50]} maxHeight={530} />

    <Paragraph>
      These shapes are straightforward and declarative, but that simplicity
      comes at the cost of flexibility; you can only create a handful of different shapes.
    </Paragraph>

    <Paragraph>
      To do neat curvy things, we need to use the{' '}
      <InlineCode>{'<path>'}</InlineCode> element. This swiss-army-knife of an
      SVG primitive lets you specify a sequence of steps to execute, in a
      seemingly-inscrutable bundle of letters and numbers:
    </Paragraph>

    <LiveEditableCode code={pathIntroCode} />

    <Paragraph>
      The interactive code snippet above uses 2 commands:
    </Paragraph>

    <ul>
      <li><InlineCode>M</InlineCode>, which instructs the path to <strong>move</strong> to a specific coordinate.</li>
      <li><InlineCode>L</InlineCode> commands, which instruct the path to create a <strong>line</strong> from the current position to the specified coordinate.</li>
    </ul>

    <Paragraph>
      Both the <InlineCode>M</InlineCode> and <InlineCode>L</InlineCode> commands take an X/Y coordinate as their "arguments". So, the path in the code snippet above instructs the path to move to a specific point, and then draw 3 connected lines. By default, <InlineCode>{'<path>'}</InlineCode> elements are self-closing, and so a line is implicitly created from the final point to the starting one.
    </Paragraph>

    <Paragraph>
      The <InlineCode>path</InlineCode> element gives us access to Bézier curves
      through the Q and C commands.
    </Paragraph>

    <BezierController />
  </BlogPostTemplate>
);
