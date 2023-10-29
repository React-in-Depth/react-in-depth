import { ComponentPropsWithoutRef } from "react";
import { Rating } from "./Rating";
import "./BookReview.css";
type RatingProps = ComponentPropsWithoutRef<typeof Rating>;
type PickedRatingProps = Pick<RatingProps, "value" | "max" | "icon">;
interface BookReviewProps extends PickedRatingProps {
  title: string;
  reviewer: string;
  body: string;
}
export function BookReview({
  title,
  reviewer,
  body,
  ...rest
}: BookReviewProps) {
  return (
    <section className="review">
      <Rating max={5} {...rest} />
      <h3 className="review__title">{title}</h3>
      <h4 className="review__byline">By {reviewer}</h4>
      <p className="review__body">{body}</p>
    </section>
  );
}
