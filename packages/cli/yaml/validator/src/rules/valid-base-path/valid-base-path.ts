import { Rule, RuleViolation } from "../../Rule";

export const ValidBasePathRule: Rule = {
    name: "valid-base-path",
    create: () => {
        return {
            serviceFile: {
                httpService: (service) => {
                    if (service["base-path"] === "/") {
                        return [];
                    }

                    const violations: RuleViolation[] = [];

                    if (!service["base-path"].startsWith("/")) {
                        violations.push({
                            severity: "error",
                            message: "base-path must start with a slash.",
                        });
                    }

                    if (service["base-path"].endsWith("/")) {
                        violations.push({
                            severity: "error",
                            message: "base-path cannot end with a slash.",
                        });
                    }

                    return violations;
                },
            },
        };
    },
};
