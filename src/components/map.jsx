import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { toast } from "sonner";

export default function MarkerComp({ setPosition }) {
  const [position, setLocalPosition] = useState(null);

  // get address name
  const reverseGeocode = async (lng, lat) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar&addressdetails=1`
      );
      const data = await res.json();
      if (!data) throw new Error("Error in fetch address name");

      const address = data.display_name || "العنوان غير متاح";
      setPosition({
        lat,
        lng,
        address: address,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocalPosition({ lat, lng });
      reverseGeocode(lng, lat);
    },
  });

  return position === null ? null : <Marker position={position} />;
}
