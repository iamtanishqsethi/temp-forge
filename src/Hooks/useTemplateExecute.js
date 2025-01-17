import { useEffect, useState } from "react";
import { Parser } from "../Parser/parser";
import { Evaluator } from "../Evaluator/evaluator";

const useTemplateExecute = ({ templateStr }) => {
    const [templateData, setTemplateData] = useState(null);

    const parser = new Parser();

    const processTemplate = () => {
        try {
            const parsedAST = parser.parse(templateStr);
            const data = Evaluator(parsedAST);
            const newTemplateData = {
                id: Date.now(),
                AST: parsedAST,
                data: data,
                template: templateStr,
                prompts: [],
            };
            setTemplateData(newTemplateData);
        } catch (error) {
            console.error("Error processing template:", error);
        }
    };

    useEffect(() => {
        if (templateStr) {
            processTemplate();
        }
    }, [templateStr]);

    return {
        templateData,
        processTemplate,
    };
};

export default useTemplateExecute;
