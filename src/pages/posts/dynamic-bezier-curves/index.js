import React from 'react';

import { COLORS } from '../../../constants';

import BlogPostTemplate from '../../../templates/BlogPost';
import Paragraph from '../../../components/Paragraph';
import Heading from '../../../components/Heading';
import Divider from '../../../components/Divider';
import SingleAxisDemo from '../../../components/SingleAxisDemo';
import MouseTracker from './MouseTracker';
import InitialCurve from './InitialCurve';

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
      like {'<rect>'} or {'<ellipse>'}.
    </Paragraph>

    <Paragraph>
      These shapes are straightforward and declarative, but that simplicity
      comes at the cost of flexibility; you can't express "unusual" shapes like
      a curved line.
    </Paragraph>

    <Paragraph>
      Vestibulum semper sem eget enim tristique semper. Integer nec placerat
      tortor, sit amet volutpat nunc. Aliquam in velit volutpat ex iaculis
      semper. Morbi pulvinar mauris lacus, at convallis purus maximus malesuada.
      Integer eget mauris fringilla, mattis est condimentum, blandit arcu. Donec
      at diam odio. Integer sodales purus velit, vitae ullamcorper orci maximus
      ut. Maecenas vel ante eget risus scelerisque tempor vel quis felis. Cras
      sodales, ante eget dapibus vestibulum, lorem justo egestas augue, ac
      euismod ex metus suscipit ex. Proin sed sem libero. Suspendisse
      ullamcorper nunc a urna iaculis, ut ultrices arcu accumsan. Vivamus
      efficitur sed ligula eu aliquet.
    </Paragraph>
  </BlogPostTemplate>
);
