import { AbsoluteFilePath, join, RelativeFilePath } from "@fern-api/fs-utils";
import { CONSOLE_LOGGER } from "@fern-api/logger";
import { parse } from "@fern-api/openapi-parser";
import { createMockTaskContext } from "@fern-api/task-context";
import { bundle, Config } from "@redocly/openapi-core";
import path from "path";
import { convert } from "../convert";

const FIXTURES_PATH = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures"));

// eslint-disable-next-line jest/no-export
export function testConvertOpenAPI(fixtureName: string, filename: string): void {
    // eslint-disable-next-line jest/valid-title
    describe(fixtureName, () => {
        it("simple", async () => {
            const openApiPath = path.join(FIXTURES_PATH, fixtureName, filename);
            const mockTaskContext = createMockTaskContext({ logger: CONSOLE_LOGGER });

            const result = await bundle({
                config: new Config({ apis: {}, styleguide: {} }, undefined),
                ref: openApiPath,
                dereference: false,
                removeUnusedComponents: false,
                keepUrlRefs: true,
            });

            const openApiIr = await parse({
                asyncApiFile: undefined,
                openApiFile: {
                    absoluteFilepath: AbsoluteFilePath.of(openApiPath),
                    contents: JSON.stringify(result.bundle.parsed),
                },
                taskContext: mockTaskContext,
            });
            const fernDefinition = convert({ openApiIr, taskContext: mockTaskContext });
            expect(fernDefinition).toMatchSnapshot();
        });
    });
}
