interface String {

	/** Converter string em Date */
	toDate(): Date

	/** Converter data-string para data formato BR (dd/mm/aaaa) */
	toDateBR(): String

	/** Converter data-string para string formato DB (aaaa-mm-dd) */
	toDateDB(): String
}

interface Date {
	/**
	 * Calcular diferença (em dias) para a data corrente
	 */
	diffDays(): Number

	/**
	 * Calcular diferença (em dias) para a data informada
	 * - d: Data a ser comparada
	 */
	diffDays(d: Date | String): Number

	/** Converter Date para String no formato BR (dd/mm/aaaa) */
	toDateBR(): String

	/** Converter Date para data formato DB (aaaa-mm-dd) */
	toDateDB(): String

	/** 
	 * Incrementar ou Decrementar data
	 * - expressao: Expressão de incremento ou decremento 
	 */
	addDate(expressao: String): Date

	/** 
	 * Incrementar ou Decrementar data
	 * - d: dias
	 */
	addDate(d: Number): Date

	/** 
	 * Incrementar ou Decrementar data
	 * - d: dias
	 * - m: meses
	 */
	addDate(d: Number, m: Number): Date

	/** 
	* Incrementar ou Decrementar data
	* - d: dias
	* - m: meses
	* - a: anos
	*/
	addDate(d: Number, m: Number, a: Number): Date
}

interface Number {
	/** Converter número en expressão monetária no formato R$ #,00 */
	toMoney(): String
}

interface Object {
	/** 
	* Retornar valor de propriedade a partir de uma chave
	* - key: Chave de identificação da propriedade
	*/
	valueOfKey(key: String): any

	/** 
	* Alterar valor de propriedade a partir de uma chave
	* - key: Chave de identificação da propriedade
	* - value: Novo valor para a propriedade
	*/
	valueOfKey(key: String, value: any): Object

}

/** 
 * Opções da extensão jQuery.actionable 
 * @typedef {Object} ActionableOptions
 * @property {Array.<ActionableAction|ActionableActionEnum>} actions Lista de ações
 * @property {ActionableCallback} callback Função chamada após execução de ação
 */

/**
 * Ação definida para os elementos acionáveis
 * @typedef {Object} ActionableAction
 * @property {String} name Nome
 * @property {String} title Descrição
 * @property {String} icon Ícone
 * @property {RegExp|ActionableCallback} condition Codição de exibição
 */

/**
 * Função callback utilizada pelos elementos acionáveis
 * @callback ActionableCallback
 * @param {Element} target Elemento acionável alvo da ação
 * @param {String} name Nome da ação executada
 * @returns {Boolean} Retorna true se deve ser exibida quan do o callback é utlizado como condição de exibição 
 */

/**
 * @typedef ActionableActionEnum
 * @property {String} copy Copiar conteúdo para área de transferência
 */

