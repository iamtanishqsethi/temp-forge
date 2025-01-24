import { Parser } from "../Parser/parser";
import { Evaluator } from "../Evaluator/evaluator";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../Utils/firebase-config";
import { useSelector } from "react-redux";

const useTemplateExecute = () => {
    const user = useSelector((store) => store.user)
    const parser = new Parser();
    const processTemplate = async (templateStr) => {
        try {
            if (!user) {
                throw new Error("User not authenticated")
            }
            console.log(user)
            if (!user) {
                throw new Error("User ID is missing");
            }

            const parsedAST = parser.parse(templateStr);
            const data = Evaluator(parsedAST);

            const docRef = await addDoc(collection(database, user), {
                AST: parsedAST,
                data: data,
                templateStr: templateStr,
                prompts: [],
            });
            return docRef.id;
        } catch (error) {
            console.error("Error processing template:", error);
            throw error;
        }
    }

    return processTemplate;
}

export default useTemplateExecute;

