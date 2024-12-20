class FeatureBase {
    constructor() {
        if (this.constructor == FeatureBase) throw new Error("Abstract classes can't be instantiated.");
    }
    code = "";

    elements = null;

    run(code = "") {
        code = (code || this.code) ?? "";

        let precode = `
            var __consoleOutput = "";
        
            function log(...obj) {
                if (arguments.length > 1) {
                    let ret = "";
                    for (const a of arguments) ret += (ret ? " " : "") + log(a);
                    return ret;
                }
                obj = obj[0];
                if (obj == null || typeof obj === 'string' || typeof obj === 'number') return String(obj);
                if (obj instanceof HTMLElement) return '<' + obj.nodeName.toLowerCase() + '>';
                if (obj instanceof Text) return '"' + obj.nodeValue + '"';
                if (typeof obj === 'object') return JSON.stringify(obj, null, "    ").replace(/^([ \t]*)"([^"]+)":/gm, "$1$2:");
                if (obj.toString) return obj.toString();
                return String(obj);
            }
        `;

        code = precode + code;
        code = code.replace(/console.log\(/ig, '__consoleOutput += (__consoleOutput?"\\n":"") + log(');
        code += "\n__consoleOutput;";

        "use strict";
        return eval?.(code);
    }


}

class StringToDateFeature extends FeatureBase {
    code = `
        var data = "16/09/2016";
        console.log(data.toDate());
    `;
}

class StringToDateBRFeature extends FeatureBase {
    code = `
        var data = "2016-09-16";
        console.log(data.toDateBR());
    `;
}

class StringToDateDBFeature extends FeatureBase {
    code = `
        var data = "16/09/2016";
        console.log(data.toDateDB());
    `;
}

class DateDiffDaysFeature extends FeatureBase {
    code = `
        var dateString = "16/09/2016";
        var date = dateString.toDate();

        var hoje = new Date();

        console.log(date.diffDays(hoje) + " dias");


        console.log("hoje".toDate().diffDays("yesterday") + " dia");

    `;
}

class DateToDateBRFeature extends FeatureBase {
    code = `
        var hoje = new Date();

        console.log("HOJE: " + hoje.toDateBR());
    `;
}

class DateToDateDBFeature extends FeatureBase {
    code = `
        var hoje = new Date();

        console.log(hoje.toDateDB());
    `;
}

class DateAddDateFeature extends FeatureBase {
    code = `
        var hoje = new Date();
        
        console.log("HOJE: " + hoje.toDateBR());

        hoje.addDate("+10 days");
        console.log("HOJE + 10 dias: " + hoje.toDateBR());

        hoje.addDate("-2 meses");
        console.log("HOJE + 10 dias - 2 meses: " + hoje.toDateBR());

        hoje.addDate("+3y");
        console.log("HOJE + 10 dias - 2 meses + 3 anos: " + hoje.toDateBR());

    `;
}

class NumberToMoneyFeature extends FeatureBase {
    code = `
        var valor = 22.26;

        console.log(valor.toMoney());
    `;
}

class ObjectValueOfKeyFeature extends FeatureBase {
    code = `
        var obj = { 
            a: 10, 
            b: 20, 
            c: { 
                i: 31, 
                ii: 32, 
                iii: 33 
            }
        };

        console.log("O valor de obj.c.i é " + obj.valueOfKey("c.i"));

        obj.valueOfKey("c.iv", 34);

        console.log("O valor de obj.c é ", obj.valueOfKey("c"));
    `;
}

class JQueryInViewportFeature extends FeatureBase {
    code = `
        var inViewPort = $('#divTeste').inViewport();
        console.log(inViewPort);
    `;

    elements = `
        <div style="width: 100%; height: 200px; overflow-y: auto;">
            <div style="width:1500px; height: 1500px;">
                <div id="divTeste" style="background-color: yellow; width: 100px; height: 100px; top: 10px; left: 100px;position: relative;">
                </div>
            </div>
        </div>
    `;
}




var classMapFeatures = {
    "StringToDateFeature": { cls: StringToDateFeature, caption: "String.toDate" },
    "StringToDateBRFeature": { cls: StringToDateBRFeature, caption: "String.toDateBR" },
    "StringToDateDBFeature": { cls: StringToDateDBFeature, caption: "String.toDateDB" },
    "DateDiffDaysFeature": { cls: DateDiffDaysFeature, caption: "Date.DiffDays" },
    "DateToDateBRFeature": { cls: DateToDateBRFeature, caption: "Date.toDateBR" },
    "DateToDateDBFeature": { cls: DateToDateDBFeature, caption: "Date.toDateDB" },
    "DateAddDateFeature": { cls: DateAddDateFeature, caption: "Date.addDate" },
    "NumberToMoneyFeature": { cls: NumberToMoneyFeature, caption: "Number.toMoney" },
    "ObjectValueOfKeyFeature": { cls: ObjectValueOfKeyFeature, caption: "Object.valueOfKey" },
    "JQueryInViewportFeature": { cls: JQueryInViewportFeature, caption: "jQuery.inViewport" },
};
