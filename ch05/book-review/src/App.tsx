import { BookReview } from "./BookReview";

function App() {
  return (
    <div className="reviews">
      <BookReview
        title="Great book"
        reviewer="Anonymous"
        body="I loved the book"
        value={4.8}
      />
      <BookReview
        title="Mediocre Sci-fi"
        reviewer="Sci-fi Lover"
        body="The aliens are boring."
        value={3.3}
        icon="👽"
      />
      <BookReview
        title="It's a classic!"
        reviewer="Hiro Protagonist"
        body="The perfect romance novel."
        value={9.2}
        max={10}
        icon="💕"
      />
    </div>
  );
}

export default App;
