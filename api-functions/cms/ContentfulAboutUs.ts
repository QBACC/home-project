import { gql } from "graphql-request";
import { AboutUsContent } from "../../interfaces/contentful-about";
import { client, CMS_ERRORS } from "./ContentfulLanding";

const aboutUsPageQuery = gql`
  query AboutUsPageContent {
    entryCollection(
      where: { contentfulMetadata: { tags: { id_contains_all: ["aboutUs"] } } }
    ) {
      items {
        __typename
        ... on RichTextOnly {
          title
          richDescription: description {
            json
          }
        }
      }
    }
  }
`;

export async function fetchAboutUs() {
  try {
    const data = await client.request(aboutUsPageQuery);
    if (!data || !data.entryCollection) throw CMS_ERRORS.unableToFetch;
    const content: Partial<AboutUsContent> = {};
    for (const item of data.entryCollection.items) {
      if (!item) continue;
      if (item.__typename === "RichTextOnly") {
        content.aboutUs = item;
      }
    }
    return content;
  } catch (error) {
    console.error(error);
    throw CMS_ERRORS.unableToFetch;
  }
}
