// app/providers.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import PostHogPageView from "./PostHogPageView";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    
    if (!phKey || !phHost) {
      console.error('PostHog configuration is missing');
      return;
    }

    posthog.init(phKey, {
      api_host: phHost,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
