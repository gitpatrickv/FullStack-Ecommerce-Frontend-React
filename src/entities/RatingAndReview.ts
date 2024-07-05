export interface RatingAndReviews {
    reviewId: number;
    rating: number;
    review: string;
    name: string;
    photoUrl: string;
    createdDate: string;
}

interface PageResponse {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export default interface RatingAndReviewResponse {
    ratingAndReviewModels: RatingAndReviews[];
    pageResponse: PageResponse;
}