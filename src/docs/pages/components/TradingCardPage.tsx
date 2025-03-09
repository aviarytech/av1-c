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