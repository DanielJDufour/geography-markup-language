# geography-markup-language
Parse Geography Markup Language in Pure JavaScript

## install
```bash
npm install geography-markup-language
```

## usage
- [Envelope](#envelope)
- [LineString](#linestring)
- [Polygon](#polygon)
- [Point](#point)
- [Geometry](#geometry)

### envelope
```js
import { Envelope } from "geography-markup-language";

const xml = `
<gml:Envelope>
  <gml:lowerCorner>42.943 -71.032</gml:lowerCorner>
   <gml:upperCorner>43.039 -69.856</gml:upperCorner>
</gml:Envelope>
`;

Envelope(xml)
{
  srs: null,
  corners: [
    [42.943, -71.032], // lower corner
    [43.039, -69.856] // upper corner
  ]
}

// convert Envelope to GeoJSON
Envelope(xml, { format: "geojson" })
{
  type: "Feature",
  bbox: [-71.032, 42.943, -69.856, 43.039],
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-71.032, 43.039],
        [-71.032, 42.943],
        [-69.856, 42.943],
        [-69.856, 43.039],
        [-71.032, 43.039]
      ]
    ]
  }
}
```

### LineString
```js
import { LineString } from "geography-markup-language";

const xml = `
  <gml:LineString>
    <gml:posList>
      45.256 -110.45 46.46 -109.48 43.84 -109.86
    </gml:posList>
  </gml:LineString>
`;

LineString(xml)
{
  type: "LineString",
  coords: [
    [45.256, -110.45],
    [46.46, -109.48],
    [43.84, -109.86]
  ]
}

// convert line string into geojson
LineString(xml, { format: "geojson" });
 {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [-110.45, 45.256],
      [-109.48, 46.46],
      [-109.86, 43.84]
    ]
  }
}
```

### Polygon
```js
import { Polygon } from "geography-markup-language";

const xml = `
<gml:Polygon>
    <gml:outerBoundaryIs>
        <gml:LinearRing>
            <gml:coordinates>0,0 100,0 100,100 0,100 0,0</gml:coordinates>
        </gml:LinearRing>
    </gml:outerBoundaryIs>
    <gml:innerBoundaryIs>
        <gml:LinearRing>
            <gml:coordinates>1,1 99,1 99,99 1,99 1,1</gml:coordinates>
        </gml:LinearRing>
    </gml:innerBoundaryIs>
</gml:Polygon>
`;

Polygon(xml, { format: "geojson" });
{
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
        [0, 0]
      ],
      [
        [1, 1],
        [1, 99],
        [99, 99],
        [99, 1],
        [1, 1]
      ]
    ]
  }
}
```

### Point
```js
import { Point } from "geography-markup-language";

// xml for Hawaii
const xml = `<gml:Point><gml:pos> 19.741755 -155.844437 </gml:pos></gml:Point>`;

Point(xml, { format: "geojson" })
{
  type: "Feature",
  properties: {},
  geometry: {
    type: "Point",
    coordinates: [-155.844437, 19.741755]
  }
}
```

### Geometry
If you are not sure what type of geometry you are parsing, you can call Geometry.
It will automatically determine which geometry is being parsed and internally call [Envelope](#envelope), [LineString](#linestring), [Point](#point), or [Polygon](#Polygon) accordingly.
```js
import { Geometry } from "geography-markup-language";

// xml for Hawaii
const xml = `<gml:Point><gml:pos> 19.741755 -155.844437 </gml:pos></gml:Point>`;

Geometry(xml, { format: "geojson" })
{
  type: "Feature",
  properties: {},
  geometry: {
    type: "Point",
    coordinates: [-155.844437, 19.741755]
  }
}
```

## references
- [Geography Markup Language (Wikipedia)](https://en.wikipedia.org/wiki/Geography_Markup_Language)
- [OGC GeoRSS Encoding Standard](http://docs.ogc.org/cs/17-002r1/17-002r1.html)
