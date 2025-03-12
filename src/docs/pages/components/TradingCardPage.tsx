import * as React from "react";
import { ComponentDemo } from "../../components/ComponentDemo";
import { PropsTable } from "../../components/PropsTable";
import { TradingCard } from "../../../components/card/TradingCard";
import { VerifiableCredential, VerifiableCredentialCard } from "../../../components/card/VerifiableCredentialCard";
import { Title } from "../../../components/typography/Title";

export const TradingCardPage = () => {
  const tradingCardProps = [
    {
      name: "imageUrl",
      type: "string",
      description: "The image URL to display in the card",
      required: true,
    },
    {
      name: "title",
      type: "string",
      description: "The title of the card",
      required: true,
    },
    {
      name: "subtitle",
      type: "string",
      description: "The subtitle or type of the card",
    },
    {
      name: "attributeValue",
      type: "string | number",
      description: "The main attribute value (like HP in Pokémon cards)",
    },
    {
      name: "attributeLabel",
      type: "string",
      description: "The attribute label (like 'HP')",
    },
    {
      name: "description",
      type: "string",
      description: "The main content or description",
    },
    {
      name: "footer",
      type: "string",
      description: "Optional footer text",
    },
    {
      name: "borderColor",
      type: "string",
      description: "Card border color",
      defaultValue: "#4299e1",
    },
    {
      name: "backgroundColor",
      type: "string",
      description: "Card background color",
      defaultValue: "#ebf8ff",
    },
    {
      name: "enable3D",
      type: "boolean",
      description: "Whether to enable 3D perspective effect",
      defaultValue: "true",
    },
    {
      name: "maxRotation",
      type: "number",
      description: "Maximum rotation angle in degrees",
      defaultValue: "10",
    },
    {
      name: "glareIntensity",
      type: "number",
      description: "Glare effect intensity (0-1)",
      defaultValue: "0.25",
    },
    {
      name: "variant",
      type: "'default' | 'fullArt'",
      description: "Card variant style - default or full art",
      defaultValue: "'default'",
    },
    {
      name: "traits",
      type: "{ name: string; value: string }[]",
      description: "Array of traits to display in a grid layout at the bottom of the card",
      defaultValue: "[]",
    },
    {
      name: "borderThickness",
      type: "'thin' | 'thick'",
      description: "Border thickness - thin (2px) or thick (8px)",
      defaultValue: "'thin'",
    },
    {
      name: "imageFit",
      type: "'contain' | 'cover' | 'scale-down'",
      description: "Image fit style - contain (full image), cover (may crop), or scale-down (prevents stretching)",
      defaultValue: "'scale-down'",
    },
  ];

  const vcCardProps = [
    {
      name: "credential",
      type: "VerifiableCredential",
      description: "The verifiable credential data to display",
      required: true,
    },
    {
      name: "imageProperty",
      type: "string",
      description: "Which credential subject property to use as the main image",
      defaultValue: "image",
    },
    {
      name: "titleProperty",
      type: "string",
      description: "Which credential subject property to use as the title",
      defaultValue: "name",
    },
    {
      name: "displayProperties",
      type: "string[]",
      description: "Which credential subject properties to display in the card body",
      defaultValue: "[]",
    },
    {
      name: "showVerificationStatus",
      type: "boolean",
      description: "Whether to show the verification status",
      defaultValue: "true",
    },
  ];

  // Example credential for demo
  const exampleCredential = {
    "@context": [
      "https://www.w3.org/ns/credentials/v2"
    ],
    "id": "urn:uuid:58afcb57-0981-4e0c-a9f5-d1d0a5b0f9d0",
    "type": ["VerifiableCredential", "PokemonTrainerCard"],
    "issuer": {
      "id": "did:example:123",
      "name": "Pokemon League"
    },
    "issuanceDate": "2023-06-15T00:00:00Z",
    "credentialSubject": {
      "id": "did:example:456",
      "name": "Froslass",
      "type": "Ice/Ghost",
      "level": 43,
      "hp": 90,
      "attack": "Blizzard",
      "damage": 40,
      "weakness": "Fire",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/478.png",
      "description": "When it finds humans or Pokémon it likes, it freezes them and takes them to its chilly den, where they become decorations."
    },
    "verificationStatus": "verified"
  };

  // Example traits for the trading card
  const exampleTraits = [
    { name: "Type", value: "Ice/Ghost" },
    { name: "Level", value: "43" },
    { name: "HP", value: "90" },
    { name: "Attack", value: "Blizzard" },
    { name: "Damage", value: "40" },
    { name: "Weakness", value: "Fire" },
  ];

  return (
    <div className="space-y-12">
      <ComponentDemo
        title="Trading Card"
        description="An interactive 3D trading card component with perspective effects on hover/touch."
        code={`import { TradingCard } from "av1-c";

const MyComponent = () => (
  <TradingCard
    imageUrl="https://example.com/image.jpg"
    title="Card Title"
    subtitle="Card Subtitle"
    attributeValue={100}
    attributeLabel="HP"
    description="This is a description of the card."
    footer="Card footer text"
    traits={[
      { name: "Type", value: "Normal" },
      { name: "Level", value: "50" }
    ]}
  />
);`}
      >
        <div className="flex justify-center">
          <TradingCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/478.png"
            title="Froslass"
            subtitle="Ice/Ghost"
            attributeValue={90}
            attributeLabel="HP"
            description="When it finds humans or Pokémon it likes, it freezes them and takes them to its chilly den, where they become decorations."
            footer="NO. 0478 Snow Land Pokémon HT: 4'3 WT: 58.6 lbs."
            traits={exampleTraits}
          />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Properties</Title>
        <div className="mt-4">
          <PropsTable props={tradingCardProps} />
        </div>
      </section>

      <ComponentDemo
        title="Full Art Variant"
        description="A full art variant of the trading card with the image covering the entire card."
        code={`import { TradingCard } from "av1-c";

const MyComponent = () => (
  <TradingCard
    variant="fullArt"
    imageUrl="https://example.com/image.jpg"
    title="Full Art Card"
    subtitle="Special Edition"
    traits={[
      { name: "Type", value: "Fire" },
      { name: "Rarity", value: "Legendary" },
      { name: "Attack", value: "Inferno" },
      { name: "Defense", value: "Shield" }
    ]}
  />
);`}
      >
        <div className="flex justify-center">
          <TradingCard
            variant="fullArt"
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
            title="Charizard"
            subtitle="Fire/Flying"
            description="Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself."
            traits={[
              { name: "Type", value: "Fire/Flying" },
              { name: "Level", value: "76" },
              { name: "HP", value: "150" },
              { name: "Attack", value: "Fire Blast" },
              { name: "Damage", value: "120" },
              { name: "Weakness", value: "Water" },
            ]}
          />
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="Thick Border"
        description="Trading card with a thicker border for a more traditional look."
        code={`import { TradingCard } from "av1-c";

const MyComponent = () => (
  <TradingCard
    imageUrl="https://example.com/image.jpg"
    title="Thick Border Card"
    borderThickness="thick"
    borderColor="#e11d48"
    traits={[
      { name: "Type", value: "Water" },
      { name: "Rarity", value: "Rare" }
    ]}
  />
);`}
      >
        <div className="flex justify-center">
          <TradingCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
            title="Blastoise"
            subtitle="Water"
            borderThickness="thick"
            borderColor="#0ea5e9"
            attributeValue={180}
            attributeLabel="HP"
            description="It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell."
            traits={[
              { name: "Type", value: "Water" },
              { name: "Level", value: "80" },
              { name: "Attack", value: "Hydro Pump" },
              { name: "Defense", value: "High" },
            ]}
          />
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="Image Fit Options"
        description="Control how images are displayed with different fit options to prevent stretching or cropping."
        code={`import { TradingCard } from "av1-c";

// Three cards with different image fit options
<div className="flex gap-4 flex-wrap">
  <TradingCard
    imageUrl="https://example.com/image.jpg"
    title="Scale Down"
    subtitle="Default - prevents stretching"
    imageFit="scale-down"
    traits={[{ name: "Fit", value: "Scale Down" }]}
  />
  <TradingCard
    imageUrl="https://example.com/image.jpg"
    title="Contain"
    subtitle="Shows full image"
    imageFit="contain"
    traits={[{ name: "Fit", value: "Contain" }]}
  />
  <TradingCard
    imageUrl="https://example.com/image.jpg"
    title="Cover"
    subtitle="May crop image"
    imageFit="cover"
    traits={[{ name: "Fit", value: "Cover" }]}
  />
</div>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <TradingCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            title="Scale Down"
            subtitle="Default - prevents stretching"
            imageFit="scale-down"
            traits={[
              { name: "Type", value: "Electric" },
              { name: "Fit", value: "Scale Down" },
            ]}
          />
          <TradingCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            title="Contain"
            subtitle="Shows full image"
            imageFit="contain"
            traits={[
              { name: "Type", value: "Electric" },
              { name: "Fit", value: "Contain" },
            ]}
          />
          <TradingCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            title="Cover"
            subtitle="May crop image"
            imageFit="cover"
            traits={[
              { name: "Type", value: "Electric" },
              { name: "Fit", value: "Cover" },
            ]}
          />
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="Traits Grid Layout"
        description="Trading cards now display traits in a grid layout at the bottom of the card."
        code={`import { TradingCard } from "av1-c";

const MyComponent = () => (
  <TradingCard
    imageUrl="https://example.com/image.jpg"
    title="Card with Traits"
    subtitle="Grid Layout"
    traits={[
      { name: "Strength", value: "High" },
      { name: "Speed", value: "Medium" },
      { name: "Intelligence", value: "Very High" },
      { name: "Stamina", value: "Medium" }
    ]}
  />
);`}
      >
        <div className="flex justify-center">
          <TradingCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
            title="Mewtwo"
            subtitle="Psychic"
            description="A Pokémon created by recombining Mew's genes. It's said to have the most savage heart among Pokémon."
            traits={[
              { name: "Type", value: "Psychic" },
              { name: "Level", value: "100" },
              { name: "HP", value: "200" },
              { name: "Attack", value: "Psystrike" },
              { name: "Damage", value: "150" },
              { name: "Special", value: "Legendary" },
            ]}
          />
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="Verifiable Credential Card"
        description="A specialized trading card for displaying verifiable credentials with 3D effects."
        code={`import { VerifiableCredentialCard } from "av1-c";

const MyComponent = () => (
  <VerifiableCredentialCard
    credential={myCredential}
    displayProperties={["type", "level", "hp", "attack"]}
  />
);`}
      >
        <div className="flex justify-center">
          <VerifiableCredentialCard
            imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/478.png"
            credential={exampleCredential as VerifiableCredential}
            displayProperties={["type", "level", "hp", "attack", "damage", "weakness"]}
          />
        </div>
      </ComponentDemo>

      <section>
        <Title level={3}>Verifiable Credential Card Properties</Title>
        <div className="mt-4">
          <PropsTable props={vcCardProps} />
        </div>
      </section>

      <section className="space-y-4">
        <Title level={3}>Examples</Title>
        <div className="grid grid-cols-2 gap-8">
          <ComponentDemo
            title="Custom Colors"
            description="Trading card with custom colors"
            code={`<TradingCard
  imageUrl="https://example.com/image.jpg"
  title="Custom Card"
  borderColor="#9333ea"
  backgroundColor="#f5f3ff"
  attributeValue={150}
  attributeLabel="PWR"
/>
`}
          >
            <TradingCard
              imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
              title="Gengar"
              subtitle="Ghost/Poison"
              borderColor="#9333ea"
              backgroundColor="#f5f3ff"
              attributeValue={150}
              attributeLabel="PWR"
              description="It hides in shadows. It is said that if Gengar is hiding, it cools the area by nearly 10 degrees Fahrenheit."
              traits={[
                { name: "Type", value: "Ghost/Poison" },
                { name: "Ability", value: "Shadow Tag" },
              ]}
            />
          </ComponentDemo>

          <ComponentDemo
            title="Verification States"
            description="Credential cards with different verification states"
            code={`<div className="flex gap-4">
  <VerifiableCredentialCard
    credential={{
      ...credential,
      verificationStatus: 'verified'
    }}
    displayProperties={["type", "level"]}
  />
  <VerifiableCredentialCard
    credential={{
      ...credential,
      verificationStatus: 'invalid'
    }}
    displayProperties={["type", "level"]}
  />
</div>`}
          >
            <div className="flex flex-col gap-4">
              <VerifiableCredentialCard
                imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                credential={{
                  ...exampleCredential,
                  verificationStatus: 'unverified',
                  credentialSubject: {
                    ...exampleCredential.credentialSubject,
                    name: "Pikachu",
                    type: "Electric",
                    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                  }
                }}
                displayProperties={["type", "level"]}
              />
              <VerifiableCredentialCard
                imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                credential={{
                  ...exampleCredential,
                  verificationStatus: 'invalid',
                  credentialSubject: {
                    ...exampleCredential.credentialSubject,
                    name: "Charizard",
                    type: "Fire/Flying",
                    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                  }
                }}
                displayProperties={["type", "level"]}
              />
            </div>
          </ComponentDemo>
        </div>
      </section>
    </div>
  );
}; 