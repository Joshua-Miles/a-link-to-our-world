import { resolveEncounter } from "api";
import { Assets, ItemDropper, ItemGet, SubjectImage, useSequence } from "shared";
import { Button, Column, Row, timing } from "designer-m3";
import { router } from "expo-router";

export default () => <ItemDropper 
    focus="chest"
    encounter="intro/sword-chest" 
    slug="sword" 
    type="weapon"
    name="Sword" 
    description="Use this to protect the Korok seeds."
/>
