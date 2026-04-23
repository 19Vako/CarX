import { useState } from "react";

export function ProfileRatingViewModel() {
  const [rating, setRating] = useState(5);

  return {
    rating,
  };
}
