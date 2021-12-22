import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";


export type SequenceStep = {
    stepSlug: string,
    promptHtml: string,
    title: string,
    // image: string,
}

export type Sequence = {
    slug: string,
    title: string,
    promptHtml: string,
}

export type PostMarkdownAttributes = {
    title: string;
};

// TODO: please don't read from a file :D use a database or something
const sequencesPath = path.join(__dirname, "../../../..", "content/");

function isValidPostAttributes(
    attributes: any
): attributes is PostMarkdownAttributes {
    return attributes?.title;
}

export async function getSequences(): Promise<Sequence[]> {
    const filesAndDirs = await fs.readdir(sequencesPath, { withFileTypes: true });
    const sequencesDirs = filesAndDirs.filter(dirEntry => dirEntry.isDirectory()).map(dirEntry => dirEntry.name);
    return Promise.all(
        sequencesDirs.map(async sequenceSlug => {
            const { title, slug, promptHtml } = await getSequenceIndex(sequenceSlug);

            return {
                slug,
                title,
                promptHtml
            };
        })
    );
}
export async function getIndexPromptHTML() {
    const filepath = path.join(sequencesPath, `index.md`);
    const file = await fs.readFile(filepath);
    const html = marked(file.toString());

    return html;
}

export async function getSequenceIndex(slug: string): Promise<Sequence> {
    const filepath = path.join(sequencesPath, `${slug}/index.md`);
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString());
    invariant(
        isValidPostAttributes(attributes),
        `Post ${filepath} is missing attributes`
    );

    const html = marked(body);

    return {
        slug,
        title: attributes.title,
        promptHtml: html,
    };
}

export async function getSequenceSteps(slug: string): Promise<SequenceStep[]> {
    const sequencePath = path.join(sequencesPath, slug);
    const sequenceFiles = (await fs.readdir(sequencePath)).filter((value) => value !== 'index.md').sort();
    return Promise.all(sequenceFiles.map(async (fileName, index) => {
        const stepSlug = fileName.replace('.md', '');
        const step = await getSequenceStep(slug, stepSlug);
        return step;
    }));
}

export async function getSequenceStep(sequenceSlug: string, stepSlug: string): Promise<SequenceStep> {
    const filepath = path.join(sequencesPath, `${sequenceSlug}/${stepSlug}.md`);
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(file.toString());
    invariant(
        isValidPostAttributes(attributes),
        `SequenceStep ${filepath} is missing attributes`
    );

    const html = marked(body);

    return {
        title: attributes.title,
        stepSlug,
        promptHtml: html,
    };
}