(function() {
	"use strict";
	
	function DTable(table, options, dom) {
		this.table = table;
		this.options = options;
		this.dom = dom;
	}
	
	DTable.prototype = {
		clearTable: function() {
			if (this.table.tBody) this.table.tBody.innerHTML = "";
			else $(this.table).append('<tbody />');			
		},
		
		loadData: function() {
			return new Promise((resolve, reject) => {
				if (this.options.data) {
					if (Array.isArray(this.options.data)) {
						let rows = this.options.data;
						return resolve({draw: 0, recordsTotal: rows.length, recordsFiltered: 0, data: rows});
					} else if (typeof this.options.data == "function") {
						let rows = this.options.data.call(this.table);
						if (rows && Array.isArray(rows)) return resolve({draw: 0, recordsTotal: rows.length, recordsFiltered: 0, data: rows});
						return reject(rows?rows:"Falha de carregamento");
					} else if (typeof this.options.data == "string") $.ajax({
						url: this.options.data,
						dataType: "json"
					});
				}
			});
		}
		
	}
	
	function initDTable(table, options) {
		if (!table instanceof HTMLTableElement) return null;
		
		$(table).find('tbody').remove();
		$(table).addClass("dtable").wrap('<div class="dtable-container"></div>');
		var $container = $(table).closest('.dtable-container');
		var len_page, prev_page, num_page, next_page;
		
		if (options.paginate && Array.isArray(options.paginate)) {
			var $topbar = $('<div class="dtable-topbar"><span>Exibir:</span></div>');
			len_page = $('<select class="dtable-length-page"></select>').get(0);
			
			options.paginate.forEach(item => $(len_page).append(`<option>${isNaN(item)?"Todos":item}</option>`));
			$topbar.append(len_page);
			
			var $bottombar = $('<div class="dtable-bottombar"><button class="dtable-prev-page" />&nbsp;<select class="dtable-num-page" />&nbsp;<button class="dtable-next-page" /></div>');
			prev_page = $bottombar.find('.dtable-prev-page').text(options.prevPage).get(0);
			num_page = $bottombar.find('.dtable-num-page').get(0);
			next_page = $bottombar.find('.dtable-next-page').text(options.nextPage).get(0);
			
			$container.prepend($topbar);
			$container.append($bottombar);
		}
		
		if (options.infoRecords) {
			var $infobar = $('<div class="dtable-infobar">Número de registros</div>');
			$(table).after($infobar);
		}
		
		if (options.selection) $(table.tHead).find('tr:last').prepend('<th class="dtable-col-fixed"><input type="checkbox" class="dtable-selection-all" /></th>');
		
		table.DTable = new DTable(table, options, {lenPage: len_page, prevPage: prev_page, numPage: num_page, nextPage: next_page});
		//table.DTable.loadData();
	}

	$.fn.dtable = function(options) {
		if (!options) options = {};
		
		let default_options = {scrollY: undefined,					// Altura máxima do corpo da tabela :: <number | string>
							   scrollX: undefined,					// Largura máxima da tabela :: <number | string>
							   ajax: undefined,						// URL para carregar os dados do servidor dinamicamente
							   data: undefined,						// JSON, XML ou Array com os dados para preenchimento da tabela
							   columns: undefined,					// Array com as definições das colunas da tabela :: [{bind, type, render(data, record)}...]
							   paginate: [25, 50, "*"],				// Array com os tamanhos das páginas
							   loadingMsg: "Carregando...",			// Mensagem de carregamento dos registros
							   zeroRecordsMsg: "Nenhum registro",	// Mensagem de zero registros
							   prevPage: "Anterior",				// Texto página anterior
							   nextPage: "Próxima",					// Texto próxima página
							   infoRecords: true,					// Exibir informações de registros 
							   order: 1,							// Indicação da coluna de ordenação da tabela. ex: -2 --> ordenação decrescente pela segunda coluna
							   selection: true						// Forma de seleção da linha:: false | true
							   };
							   
		for (let prop in default_options) if (default_options.hasOwnProperty(prop) && default_options[prop] !== undefined && options[prop] == undefined) options[prop] = default_options[prop];
		$(this).each((index, target) => initDTable(target, options));
		return this;
	}
	
	return $.fn.dtable;
}());
