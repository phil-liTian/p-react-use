import type { SeedToken } from "../../interface/seeds";

export default function derivative(token: SeedToken) {
  return {
    ...token,
  };
}
