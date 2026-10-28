/* Sample inventory for the demo. Twelve pieces, one of each.
   status: "live" shows "Only 1"; "sold" shows "Found a home". */
window.PRODUCTS = [
  {
    id: "opal-ruby-ring",
    title: "1930s Opal and Ruby Ring",
    type: "jewelry", era: "1930s", material: "gold", materialLabel: "14k gold, tested",
    price: 425, status: "live", tint: "c",
    photo: "PHOTO: ring on hand",
    alt: "Opal and ruby ring worn on a hand, opal facing the camera",
    found: "Found in the jewelry case at a vintage shop in [TOWN], behind a tray of class rings."
  },
  {
    id: "saddle-bag",
    title: "1970s Tooled Leather Saddle Bag",
    type: "bags", era: "1970s", material: "leather", materialLabel: "Leather",
    price: 88, status: "live", tint: "a",
    photo: "PHOTO: saddle bag, front",
    alt: "Brown tooled leather saddle bag, front view with flap closed",
    found: "Pulled from the back rack at a vintage shop in [TOWN], under a pile of belts."
  },
  {
    id: "mod-shift-dress",
    title: "1960s Tangerine Wool Shift Dress",
    type: "clothing", era: "1960s", material: "wool", materialLabel: "Wool",
    price: 96, status: "live", tint: "b",
    photo: "PHOTO: shift dress on hanger",
    alt: "Orange wool shift dress on a wooden hanger against a plain wall",
    found: "Pulled from the back rack at a vintage shop in [TOWN], wedged between two prom dresses."
  },
  {
    id: "mourning-brooch",
    title: "circa 1900 Black Glass Mourning Brooch",
    type: "jewelry", era: "circa 1900", material: "glass", materialLabel: "Glass and metal",
    price: 145, status: "live", tint: "a",
    photo: "PHOTO: brooch on velvet",
    alt: "Oval black glass mourning brooch lying on dark velvet",
    found: "Found in a case of costume pieces nobody had looked through. I looked."
  },
  {
    id: "lucite-box-purse",
    title: "1950s Pearl Lucite Box Purse",
    type: "bags", era: "1950s", material: "lucite", materialLabel: "Lucite",
    price: 165, status: "live", tint: "c",
    photo: "PHOTO: lucite purse, lid open",
    alt: "Pearly white lucite box purse with the lid open to show the inside",
    found: "Spotted on the top shelf at a vintage shop in [TOWN]. I asked for the step stool."
  },
  {
    id: "rayon-blouse",
    title: "1940s Rayon Floral Blouse",
    type: "clothing", era: "1940s", material: "rayon", materialLabel: "Rayon",
    price: 72, status: "live", tint: "b",
    photo: "PHOTO: blouse, flat lay",
    alt: "Floral rayon blouse laid flat with short puffed sleeves",
    found: "Found on the sale rack at a vintage shop in [TOWN]. The sale rack did not know what it had."
  },
  {
    id: "collar-necklace",
    title: "1980s Gold-Tone Collar Necklace",
    type: "jewelry", era: "1980s", material: "costume", materialLabel: "Gold-tone metal",
    price: 48, status: "live", tint: "a",
    photo: "PHOTO: necklace on neck form",
    alt: "Chunky gold-tone collar necklace displayed on a neck form",
    found: "Dug out of a bin of tangled chains at a vintage shop in [TOWN]. Worth the knots."
  },
  {
    id: "beaded-clutch",
    title: "1960s Beaded Evening Clutch",
    type: "bags", era: "1960s", material: "glass", materialLabel: "Glass beads",
    price: 58, status: "live", tint: "c",
    photo: "PHOTO: clutch in hand",
    alt: "Small white beaded evening clutch held in one hand",
    found: "Found in a drawer of evening bags at a vintage shop in [TOWN], still with the original mirror."
  },
  {
    id: "sterling-hoops",
    title: "1990s Sterling Silver Hoop Earrings",
    type: "jewelry", era: "1990s", material: "silver", materialLabel: "Sterling silver, hallmarked",
    price: 64, status: "live", tint: "b",
    photo: "PHOTO: hoops, pair side by side",
    alt: "Pair of thick sterling silver hoop earrings side by side",
    found: "Found in a case of costume pieces nobody had looked through. Sterling, hiding in plain sight."
  },
  {
    id: "fringe-jacket",
    title: "1970s Suede Fringe Jacket",
    type: "clothing", era: "1970s", material: "leather", materialLabel: "Suede",
    price: 185, status: "sold", tint: "a",
    photo: "PHOTO: fringe jacket, back",
    alt: "Tan suede jacket from the back, fringe hanging along the yoke",
    found: "Pulled from the coat rack at a vintage shop in [TOWN]. It found a home in four minutes."
  },
  {
    id: "rhinestone-bracelet",
    title: "1950s Rhinestone Line Bracelet",
    type: "jewelry", era: "1950s", material: "costume", materialLabel: "Rhinestones, silver-tone metal",
    price: 52, status: "sold", tint: "b",
    photo: "PHOTO: bracelet on wrist",
    alt: "Rhinestone line bracelet worn on a wrist, catching the light",
    found: "Found in the jewelry case at a vintage shop in [TOWN], every stone still in place."
  },
  {
    id: "mesh-purse",
    title: "1920s Silver-Tone Mesh Evening Purse",
    type: "bags", era: "1920s", material: "costume", materialLabel: "Silver-tone metal mesh",
    price: 210, status: "sold", tint: "c",
    photo: "PHOTO: mesh purse, hanging",
    alt: "Silver-tone metal mesh evening purse hanging from its chain",
    found: "Found in a glass case at the back of a vintage shop in [TOWN], tagged \"old purse.\""
  }
];

window.FILTER_OPTIONS = {
  type: [["bags", "Bags"], ["jewelry", "Jewelry"], ["clothing", "Clothing"]],
  era: [["circa 1900", "circa 1900"], ["1920s", "1920s"], ["1930s", "1930s"], ["1940s", "1940s"],
        ["1950s", "1950s"], ["1960s", "1960s"], ["1970s", "1970s"], ["1980s", "1980s"], ["1990s", "1990s"]],
  material: [["gold", "Gold"], ["silver", "Sterling silver"], ["costume", "Costume metal"],
             ["glass", "Glass and beads"], ["lucite", "Lucite"], ["leather", "Leather and suede"],
             ["wool", "Wool"], ["rayon", "Rayon"]],
  price: [["0-75", "Under $75"], ["75-150", "$75 to $150"], ["150-99999", "$150 and up"]]
};
