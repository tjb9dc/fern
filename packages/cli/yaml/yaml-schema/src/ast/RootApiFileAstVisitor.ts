import { NodePath } from "../NodePath";
import {
    ErrorDiscriminationSchema,
    HttpPathParameterSchema,
    MultipleBaseUrlsEnvironmentSchema,
    RootApiFileSchema,
    SingleBaseUrlEnvironmentSchema,
} from "../schemas";
import { VariableDeclarationSchema } from "../schemas/VariableDeclarationSchema";

export type RootApiFileAstVisitor<R = void | Promise<void>> = {
    [K in keyof RootApiFileAstNodeTypes]: RootApiFileAstNodeVisitor<K, R>;
};

export interface RootApiFileAstNodeTypes {
    file: RootApiFileSchema;
    defaultEnvironment: string | null | undefined;
    environment: {
        environmentId: string;
        environment: string | SingleBaseUrlEnvironmentSchema | MultipleBaseUrlsEnvironmentSchema;
    };
    errorDiscrimination: ErrorDiscriminationSchema | null | undefined;
    errorReference: string;
    variableDeclaration: {
        variableId: string;
        variable: VariableDeclarationSchema;
    };
    pathParameter: { pathParameterKey: string; pathParameter: HttpPathParameterSchema };
    variableReference: string;
}

export type RootApiFileAstNodeVisitor<K extends keyof RootApiFileAstNodeTypes, R = void | Promise<void>> = (
    node: RootApiFileAstNodeTypes[K],
    nodePath: NodePath
) => R;
