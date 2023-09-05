import { Review } from "./Review.jsx"

export function ReviewList({ reviews }) {

    if (!reviews) return 'No Reviews yet, You can be the first one!'
    return (
        <section className="reviews">
            {reviews.map(review => <Review key={review.fullName} reviewContent={review} />)}
        </section>
    )
}