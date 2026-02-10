import type {ThemeConfig} from "~/types/theme";

export interface SiteInfo extends Record<string, unknown> {
  title: string,
  subtitle: string,
  description: string,
  author: string,
  language: string,
  timezone: string,
  url: string,
  root: string,
  permalink: string,
  keywords: string | null,
  source_dir: string,
  public_dir: string,
  tag_dir: string,
  archive_dir: string,
  category_dir: string,
  code_dir: string,
  i18n_dir: string,
  default_layout: string,
  default_category: string,
  pagination_dir: string,
  theme_config: ThemeConfig
}
