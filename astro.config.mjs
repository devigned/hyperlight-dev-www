// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
integrations: [
starlight({
title: 'Hyperlight',
social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hyperlight-dev/hyperlight' }],
sidebar: [
{
label: 'Guides',
items: [
{ label: 'Getting Started', slug: 'guides/getting-started' },
],
},
],
}),
],
});
