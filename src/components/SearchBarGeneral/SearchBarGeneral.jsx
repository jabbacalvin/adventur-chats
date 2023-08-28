// // Reference: https://www.npmjs.com/package/use-places-autocomplete

// import React from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";

// export default function SearchBarPlaces() {
//   const [address, setAddress] = React.useState("");
//   const [placeId, setPlaceId] = React.useState(null);

//   const handleSelect = async (value) => {
//     const results = await geocodeByAddress(value);
//     const placeId = await results[0].place_id;
//     setAddress(value);
//     setPlaceId(placeId);
//   };

//   return (
//     <PlacesAutocomplete
//       value={address}
//       onChange={setAddress}
//       onSelect={handleSelect}
//     >
//       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//         <div>
//           <p>placeId: {placeId}</p>

//           <input {...getInputProps({ placeholder: "Search Places ..." })} />

//           <div className="autocomplete-dropdown-container">
//             {loading && <div>Loading...</div>}
//             {suggestions.map((suggestion, idx) => {
//               const className = suggestion.active
//                 ? "suggestion-item--active"
//                 : "suggestion-item";
//               // inline style for demonstration purpose
//               const style = suggestion.active
//                 ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                 : { backgroundColor: "#ffffff", cursor: "pointer" };

//               console.log(suggestion);
//               return (
//                 <div
//                   key={idx}
//                   {...getSuggestionItemProps(suggestion, {
//                     className,
//                     style,
//                   })}
//                 >
//                   <span>{suggestion.description}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </PlacesAutocomplete>
//   );
// }
