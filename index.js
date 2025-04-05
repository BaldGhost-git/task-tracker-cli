#!/usr/bin/env node
import { input } from '@inquirer/prompts';

const name = await input({message: "What's your name?"});

console.log(`Hello ${name}!`);