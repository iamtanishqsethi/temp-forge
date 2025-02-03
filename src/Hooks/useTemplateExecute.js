import { Parser } from "../Parser/parser";
import { Evaluator } from "../Evaluator/evaluator";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../Utils/firebase-config";
import { useSelector } from "react-redux";

const useTemplateExecute = () => {
    const user = useSelector((store) => store.user?.uid)
    const parser = new Parser();
    const processTemplate = async (templateStr) => {
        try {
            if (!user) {
                throw new Error("User not authenticated")
            }
            // console.log(user)

            const parsedAST = parser.parse(templateStr);
            console.log(parsedAST)
            const data = Evaluator(parsedAST);
            console.log(data)
            const docData = {
                AST: parsedAST,
                data: data,
                templateStr: templateStr,
                prompts: [],
            };
            console.log(docData)
            const docRef = await addDoc(collection(database, user), docData);
            console.log(docRef)
            return docRef.id;
        } catch (error) {
            console.error("Error processing template:", error);
            throw error;
        }
    }

    return processTemplate;
}

export default useTemplateExecute;

