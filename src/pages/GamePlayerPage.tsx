import { useParams } from "react-router-dom";
import { GameShell } from "@/components/shell/GameShell";
import { getGameBySlug } from "@/data/games";
import { usePageMeta } from "@/lib/usePageMeta";
import { Layout } from "@/components/layout/Layout";
import { NotFoundPage } from "./NotFoundPage";
import { NotOpenYet } from "./NotOpenYet";

/**
 * /play/:slug/play — renders the shell only for games that have a module.
 * Unknown slugs get the 404; games without a module get an honest "not open yet".
 */
export function GamePlayerPage() {
  const { slug } = useParams();
  const game = getGameBySlug(slug);
  usePageMeta(game ? `${game.title} · Player` : "Undiscovered");

  if (!game) return <Layout><NotFoundPage /></Layout>;
  if (!game.gameModule) return <Layout><NotOpenYet game={game} /></Layout>;
  return <GameShell key={game.id} game={game} />;
}
