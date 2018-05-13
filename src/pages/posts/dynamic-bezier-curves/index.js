import React from 'react';

import { COLORS } from '../../../constants';
import { getInterpolatedValue } from '../../../utils';

import BlogPostTemplate from '../../../templates/BlogPost';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Heading from '../../../components/Heading';
import InlineCode from '../../../components/InlineCode';
import Divider from '../../../components/Divider';
import Link from '../../../components/Link';
import Em from '../../../components/Em';
import Spacer from '../../../components/Spacer';
import Latex from '../../../components/Latex';
import SingleAxisDemo from '../../../components/SingleAxisDemo';
import LiveEditableCode from '../../../components/LiveEditableCode';
import Info from '../../../components/Info';
import InitialCurve from '../../../components/InitialCurve';
import BezierController from '../../../components/BezierController';
import BezierFlattener from '../../../components/BezierFlattener';

import basicShapesCode from './code/basic-shapes.example';
import pathIntroCode from './code/path-intro.example';
import bezierPathCode from './code/bezier-path.example';
import chainedCurvesCode from './code/chained-curves.example';
import reactBezierCode from './code/react-bezier.example';
import optimizedReactBezierCode from './code/optimized-react-bezier.example';
import interpolateFunctionCode from './code/interpolate-function.example';
import reactScrollFlattenerCode from './code/react-scroll-flattener.example';

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
      For achieving this effect, we'll use SVG. We could also use HTML Canvas,
      but SVG is easier to work with, and more accessible+.
    </Paragraph>
    <Paragraph>
      While doing a deep dive into SVG is beyond the scope of this post (I'd
      recommend the{' '}
      <Link external href="https://www.w3schools.com/graphics/svg_intro.asp">
        W3Schools tutorial
      </Link>{' '}
      for that), we'll cover the basics, and show how to create our Bézier curve
      from scratch. Experienced SVG-ers can jump to [link needed].
    </Paragraph>
    <Paragraph>
      The simplest form of SVG drawings use shape elements, like{' '}
      <InlineCode>{'<rect>'}</InlineCode> or{' '}
      <InlineCode>{'<ellipse>'}</InlineCode>.
    </Paragraph>
    <LiveEditableCode code={basicShapesCode} split={[50, 50]} maxHeight={585} />
    <Paragraph>
      These shapes are straightforward and declarative, but that simplicity
      comes at the cost of flexibility; you can only create a handful of
      different shapes.
    </Paragraph>
    <Paragraph>
      To do neat curvy things, we need to use the{' '}
      <InlineCode>{'<path>'}</InlineCode> element. This swiss-army-knife of an
      SVG primitive lets you specify a sequence of steps to execute, in a
      seemingly-inscrutable bundle of letters and numbers:
    </Paragraph>

    <LiveEditableCode code={pathIntroCode} />

    <Paragraph>The interactive code snippet above uses 2 commands:</Paragraph>
    <List>
      <ListItem>
        <InlineCode>M</InlineCode>, which instructs the path to <Em>move</Em> to
        a specific coordinate.
      </ListItem>
      <ListItem>
        <InlineCode>L</InlineCode>, which instructs the path to create a{' '}
        <Em>line</Em> from the current position to the specified coordinate.
      </ListItem>
    </List>
    <Paragraph>
      After the commands <InlineCode>M</InlineCode> and{' '}
      <InlineCode>L</InlineCode>, we see some numbers. These can be thought of
      as "arguments" for the commands. In this case, the arguments are
      coordinates; both commands require a single X/Y pair.
    </Paragraph>
    <Paragraph>
      In other words, we can read the above path as: "Move to{' '}
      <InlineCode>{'{x: 100, y: 100}'}</InlineCode>, then draw a line to{' '}
      <InlineCode>{'{x: 200, y: 100}'}</InlineCode>", and so on.
    </Paragraph>
    <Paragraph>
      The coordinate system is relative to the values specified in the{' '}
      <InlineCode>viewBox</InlineCode>. The current viewbox specifies that the
      viewable area has a top-left corner of 0/0, a width of 300, and a height
      of 300. So all of the coordinates specified in the{' '}
      <InlineCode>path</InlineCode> are within that 300x300 box.
    </Paragraph>
    <Paragraph>
      The <InlineCode>viewBox</InlineCode> is what makes SVGs scalable; we can
      make our SVG any size we like, and everything will scale naturally, since
      the elements within our SVG are relative to this 300x300 box.
    </Paragraph>
    <Paragraph>
      The <InlineCode>path</InlineCode> element features{' '}
      <Link
        href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths"
        external
        target="_blank"
      >
        quite a number
      </Link>{' '}
      of these commands. There are two that are relevant for our purposes:
    </Paragraph>
    <List>
      <ListItem>
        <InlineCode>Q</InlineCode>, which instructs the path to create a{' '}
        <Em>quadratic</Em> Bézier curve.
      </ListItem>
      <ListItem>
        <InlineCode>C</InlineCode>, which instructs the path to create a{' '}
        <Em>cubic</Em> Bézier curve.
      </ListItem>
    </List>

    <Spacer size={80} />
    <SectionHeading>Intro to Bézier Curves</SectionHeading>
    <Paragraph>
      Bézier curves are surprisingly common. Due to their versatility, they're a
      staple in most graphics software like Photoshop, but they're also used as
      timing functions: if you've ever used non-linear CSS transitions (like the
      default "ease"), you've already worked with Bézier curves!
    </Paragraph>
    <Paragraph>But what are they, and how do they work?</Paragraph>
    <Paragraph>
      A Bézier curve is essentially a line from a <Em>start point</Em> to an{' '}
      <Em>end point</Em> that is acted upon by one or more{' '}
      <Em>control points</Em>. A control point curves the line towards it, as if
      the control point was pulling it in its direction.
    </Paragraph>
    <Paragraph>
      The following line looks like a straight line, but check out what happens
      when you move the points around—try dragging the middle control point up
      and down.
    </Paragraph>
    <BezierController initialType="quadratic" />
    <Paragraph>
      The line above is a <Em>quadratic</Em> Bézier curve; this just means that
      it has a <strong>single control point</strong>. I'm guessing it gets its
      name from the fact that you can create parabola-like shapes with it:
    </Paragraph>
    <BezierController
      initialType="quadratic"
      p1={[400, 15]}
      p2={[500, 395]}
      p4={[600, 15]}
    />
    <Paragraph>
      A <Em>cubic</Em> Bézier curve, in contrast, has <strong>two</strong>{' '}
      control points. This allows for much more interesting curves:
    </Paragraph>
    <BezierController
      allowToggle
      initialType="cubic"
      p1={[25, 25]}
      p2={[333, 375]}
      p3={[666, 25]}
      p4={[975, 375]}
    />
    <Paragraph>
      The syntax for Bézier curves in SVG <InlineCode>path</InlineCode>{' '}
      definitions is a little counter-intuitive, but it looks like this:
    </Paragraph>
    <LiveEditableCode code={bezierPathCode} />
    <Paragraph>
      The counter-intuitive thing about this to me is that the{' '}
      <InlineCode>startPoint</InlineCode> is inferred in the{' '}
      <InlineCode>Q</InlineCode> command; while there are 3 points needed for a
      quadratic Bézier curve, only 2 points are passed as arguments to{' '}
      <InlineCode>Q</InlineCode>.
    </Paragraph>
    <Paragraph>
      Similarly, for a cubic Bézier curve, only the control points and the end
      point are provided to the <InlineCode>C</InlineCode> command.
    </Paragraph>
    <Paragraph>
      This syntax does mean that curves can conveniently be chained together, as
      one curve starts where the last one ends:
    </Paragraph>
    <LiveEditableCode code={chainedCurvesCode} />

    <Spacer size={80} />
    <SectionHeading>Bézier Curves in React</SectionHeading>
    <Paragraph>
      While all of the code samples have technically been React, we've just been
      rendering static elements. How can we leverage React state to make our
      SVGs dynamic?
    </Paragraph>
    <Paragraph>
      Well, in keeping with the "meta" theme of this blog post, why not examine
      the draggable-with-lines Bézier curves from earlier in this post?
    </Paragraph>
    <Paragraph>
      There's a fair bit of code to manage this, even in this
      slightly-simplified snippet. I've annotated it heavily, which hopefully
      makes things easier to parse. 🤞
    </Paragraph>
    <LiveEditableCode
      size="extra-wide"
      code={reactBezierCode}
      maxHeight={650}
    />
    <Paragraph>To summarize how this works:</Paragraph>
    <List>
      <ListItem>
        React holds variables in component state for{' '}
        <InlineCode>startPoint</InlineCode>,{' '}
        <InlineCode>controlPoint</InlineCode>, and{' '}
        <InlineCode>endPoint</InlineCode>.
      </ListItem>
      <ListItem>
        In the <Em>render</Em> method, we build the instructions for the{' '}
        <InlineCode>path</InlineCode> using these state variables.
      </ListItem>
      <ListItem>
        When the user clicks or taps on one of the points, we update the state
        to keep track of which point is moving with{' '}
        <InlineCode>draggingPointId</InlineCode>.
      </ListItem>
      <ListItem>
        As the user moves the mouse (or finger) across the SVG's surface, we do
        some calculations to figure out where the currently-dragging point needs
        to move to. This is made complex by the fact that SVGs have their own
        internal coordinate system (viewBox), and so we have to translate the
        on-screen pixels to this system.
      </ListItem>

      <ListItem>
        Once we have the new X/Y coordinate for the active point,{' '}
        <InlineCode>setState</InlineCode> lets React know about this state
        change, and the component re-renders, which causes the{' '}
        <InlineCode>path</InlineCode> to be re-calculated.
      </ListItem>
    </List>
    <Spacer size={25} />
    <SubHeading>A note on performance</SubHeading>
    <Paragraph>
      By using React's update cycle to manage the point coordinates, there is
      added overhead of letting React run its reconciliation cycle on every{' '}
      <InlineCode>mousemove</InlineCode>. Is this prohibitively expensive?
    </Paragraph>
    <Paragraph>
      The answer is that it depends. React's reconciliation can be surprisingly
      fast, especially when dealing with such a small tree (after all, the only
      thing that needs to be diffed is an SVG).
    </Paragraph>
    <Paragraph>
      I wrote an{' '}
      <Link external href="" target="_blank">
        alternative implementation
      </Link>{' '}
      that updates the DOM directly. It does run faster (about 1.5-2x faster in
      my quick test), but both implementations still clock in under 1ms on
      modern high-end hardware. With 6x CPU slowdown, the React-based
      implementation still runs around 50fps, while the optimized one caps at
      60fps.
    </Paragraph>
    <Paragraph>
      If I was targeting older devices with this specific animation, it would
      probably make sense to drop down to the lower-level implementation.
    </Paragraph>

    <Spacer size={80} />
    <SectionHeading>Curve Interpolation</SectionHeading>

    <Paragraph>
      I seem to have gotten a little side-tracked! Our original goal was to
      create a Bézier curve that flattens itself on scroll.
    </Paragraph>
    <Paragraph>
      Given what we've gone over so far, we have almost all of the tools we need
      to solve this problem! A Bézier curve with its control point(s) directly
      between the start and end points is just a straight line! So we just need
      to transition the control points from their curvy values to a flat value.
    </Paragraph>

    <BezierFlattener />
    <Spacer size={32} />

    <Paragraph>
      We need a way to <Em>interpolate values</Em>. We know where the control
      points should be at 0% and 100%, but what about when the user is 25%
      scrolled through the content?
    </Paragraph>
    <Paragraph>
      While we could be fancy and ease the transition, a linear transformation
      works just fine for our purposes. So when the user is 50% scrolled through
      the content, the control points will be 50% of the way between their
      initial curvy value, and the flat-line value.
    </Paragraph>
    <Paragraph>
      For this, some secondary-school maths will come in handy.
    </Paragraph>
    <Paragraph>
      If you plunge the depths of your memory, you may remember how to calculate
      the <Em>slope</Em> of a line. The slope tells you how the line changes
      over time. We calculate it by dividing the{' '}
      <strong>
        change in <Latex>y</Latex>
      </strong>{' '}
      over the{' '}
      <strong>
        change in <Latex>x</Latex>
      </strong>:
    </Paragraph>
    <Latex block>{'slope = \\frac{y2 - y1}{x2 - x1} = \\frac{Δy}{Δx}'}</Latex>
    <Paragraph>
      There's also this bugger, the formula to calculate the <Latex>y</Latex>{' '}
      value for any given <Latex>x</Latex> value. By convention, slope is given
      the variable <Latex>a</Latex>:
    </Paragraph>
    <Latex block>y = ax + b</Latex>
    <Paragraph>
      To understand how this'll help us interpolate, let's imagine that our
      control point's <Latex>y</Latex> value goes from 200 (curved value) to 0
      (flattened value). We can graph a line that goes from 200 to 0, and we can
      assume X goes from 0 (curved) to 1 (flattened).
    </Paragraph>
    <Paragraph>
      <strong>TODO: Insert graph?</strong>
    </Paragraph>
    <Paragraph>
      Because we know the first and last points of our line, we have all the
      variables we need for that formula!
    </Paragraph>
    <List>
      <ListItem>
        The slope would be equal to{' '}
        <Latex>
          {'\\frac{Δy}{Δx} = \\frac{0 - 200}{1 - 0} = \\frac{-200}{1} = -200'}
        </Latex>.
      </ListItem>
      <ListItem>
        Our <Latex>b</Latex> value is the y-axis intercept, which is our initial
        curved value, <Latex>200</Latex>.
      </ListItem>
      <ListItem>
        <Latex>x</Latex> will be the ratio of scroll-through, between 0 and 1,
        that we'll get from our scroll handler.
      </ListItem>
    </List>
    <Paragraph>Filling it in:</Paragraph>
    <Latex block>{'y = -200x + 200'}</Latex>

    <Paragraph>
      If it's 25% of the way through, <Latex>x</Latex> will be 0.25, and so our{' '}
      <Latex>y</Latex> value would be{' '}
      <Latex>y = (-200)(0.25) + 200 = 150</Latex>, which feels right: 150 is 1/4
      of the way between 200 and 0.
    </Paragraph>

    <Paragraph>
      Here's our function that performs the above calculations:
    </Paragraph>

    <LiveEditableCode
      maxHeight={600}
      split={[0.8, 0.2]}
      code={interpolateFunctionCode}
    />

    <Paragraph>
      Looks like teenage-me was wrong; algebra <strong>is</strong> useful and
      practical!
    </Paragraph>

    <Spacer size={80} />
    <SectionHeading>Handling Scroll in React</SectionHeading>

    <Paragraph>
      We're in the home stretch now! We just need to combine all these ideas
      into something usable.
    </Paragraph>
    <Paragraph>
      There are a number of ways we could do this. Let's start with the most
      straight-forward: Writing a single React component that flattens a curve
      on scroll.
    </Paragraph>

    <LiveEditableCode
      size="extra-wide"
      code={reactScrollFlattenerCode}
      maxHeight={650}
    />
  </BlogPostTemplate>
);
