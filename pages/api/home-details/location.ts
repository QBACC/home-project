import { NextApiRequest, NextApiResponse } from "next";

import { MockGeocoder } from "../../../api-functions/geocoding/MockGeocoder";
import { GoogleMapsGeocoder } from "../../../api-functions/geocoding/GoogleMapsGeocoder";
import { Geocoder } from "../../../api-functions/geocoding/Geocoder";
import { handleHomeDetailsLocation } from "../../../api-functions/handleHomeDetailsLocation/handleHomeDetailsLocation";

async function curriedHandler(req: NextApiRequest, res: NextApiResponse) {
  let geocoder: Geocoder;
  if (process.env.GOOGLE_MAPS_API_KEY) {
    geocoder = new GoogleMapsGeocoder(process.env.GOOGLE_MAPS_API_KEY);
  } else {
    console.warn(
      "Google Maps API key not provided, defaulting to mock service"
    );
    geocoder = new MockGeocoder();
  }

  return handleHomeDetailsLocation(req, res, geocoder);
}

export default curriedHandler;
