import { z } from "zod";

export const houseFeaturesSchema = z.object({
  square_footage: z
    .number({ error: "Square footage is required" })
    .positive("Square footage must be greater than 0"),
  bedrooms: z
    .number({ error: "Bedrooms is required" })
    .int("Bedrooms must be a whole number")
    .min(0, "Bedrooms cannot be negative"),
  bathrooms: z
    .number({ error: "Bathrooms is required" })
    .min(0, "Bathrooms cannot be negative"),
  year_built: z
    .number({ error: "Year built is required" })
    .int("Year built must be a whole number")
    .min(1800, "Year built must be 1800 or later")
    .max(2100, "Year built must be 2100 or earlier"),
  lot_size: z
    .number({ error: "Lot size is required" })
    .positive("Lot size must be greater than 0"),
  distance_to_city_center: z
    .number({ error: "Distance is required" })
    .min(0, "Distance cannot be negative"),
  school_rating: z
    .number({ error: "School rating is required" })
    .min(0, "School rating must be between 0 and 10")
    .max(10, "School rating must be between 0 and 10"),
});

export type HouseFeaturesFormValues = z.infer<typeof houseFeaturesSchema>;
