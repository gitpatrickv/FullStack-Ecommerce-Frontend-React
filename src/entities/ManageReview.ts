export interface ManageRatingAndReviews {
    reviewId: number;
    rating: number;
    review: string;
    sellersReply: string;
    name: string;
    photoUrl: string;
    createdDate: string;
    productName: string;
    productPhotoUrl: string;
}

interface PageResponse {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export default interface ManageReviewResponse {
    ratingAndReviewModels: ManageRatingAndReviews[];
    pageResponse: PageResponse;
}