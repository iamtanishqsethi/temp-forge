import { Parser } from "../Parser/parser";
import { Evaluator } from "../Evaluator/evaluator";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../Utils/firebase-config";
import { useSelector } from "react-redux";

const useTemplateExecute = () => {
    const user = useSelector((store) => store.user?.uid)
    const parser = new Parser();
    const processTemplate = async (templateStr,templateTitle) => {
        try {
            if (!user) {
                throw new Error("User not authenticated")
            }
            // console.log(user)

            const parsedAST = parser.parse(templateStr);
            const data = Evaluator(parsedAST);
            console.log(data)
            const docData = {
                templateTitle:templateTitle,
                AST: parsedAST,
                data: data,
                templateStr: templateStr,
                prompts: [],
            };
            const docRef = await addDoc(collection(database, user), docData);
            return docRef.id;
        } catch (error) {
            console.error("Error processing template:", error);
            throw error;
        }
    }

    return processTemplate;
}

export default useTemplateExecute;

