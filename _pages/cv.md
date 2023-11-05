---
layout: cv
permalink: /cv/
title: Resume
nav: true
cv_pdf: 
--- 

<div class="cv">
	{% for entry in site.data.cv %}
		<div class="card mt-3 p-3">
			<h3 class="card-title font-weight-medium">{{ entry.title }}</h3>
			<div>
			{% if entry.type == "list" %}
				<ul class="card-text font-weight-light list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="list-group-item">{{ content}}</li>
				{% endfor %}
				</ul>
			{% elsif entry.type == "map" %}
				<table class="table table-sm table-borderless table-responsive">
					{% for content in entry.contents %}
						<tr>
							<td class="p-1 pr-2 font-weight-bold"><b>{{ content.name }}</b></td>
							<td class="p-1 pl-2 font-weight-light text">{{ content.value }}</td>
						</tr>
					{% endfor %}
				</table>
			{% elsif entry.type == "nested_list" %}
				<ul class="card-text font-weight-light list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="list-group-item">
					<h5 class="title font-weight-bolder" style="font-size:18px;">{{ content.title }}</h5>
					{% if content.items %}
						<ul class="subitems">
							{% for subitem in content.items %}
								<li><span class="subitem">{{ subitem }}</span></li>
							{% endfor %}
						</ul>
					{% endif %}
					</li>
				{% endfor %}
				</ul>
			{% elsif entry.type == "table" %}
				<ul class="card-text font-weight-light list-group list-group-flush">
				{% for content in entry.contents %}
					<li class="list-group-item">
						<div class="row">
							{% if content.year %}
								<div class="col-xs-2 cl-sm-2 col-md-auto text-right" style="width: 85px;">
									<span class="badge font-weight-normal danger-color-dark align-middle" style="width: 85px;margin-top:-8px; margin-left:-15px;">
										{{ content.year }}
									</span>
								</div>
							{% endif %}
							<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
								{% if content.title %}
								<h6 class="title font-weight-bolder ml-1 ml-md-4" style="left:-8px; position:relative;">{{content.title}}</h6>
								{% endif %}
								{% if content.description %}
									<ul class="items">
										{% for item in content.description %}
											<li>
												{% if item.contents %}
													<span class="item-title">{{ item.title }}</span>
													<ul class="subitems">
													{% for subitem in item.contents %}
														<li><span class="subitem">{{ subitem }}</span></li>
													{% endfor %}
													</ul>
												{% else %}
													<span class="item">{{ item }}</span>
												{% endif %}
											</li>
										{% endfor %}
									</ul>
								{% endif %}
								{% if content.items %}
									<ul class="items">
										{% for item in content.items %}
											<li>
												{% if item.contents %}
													<span class="item-title">{{ item.title }}</span>
													<ul class="subitems">
													{% for subitem in item.contents %}
														<li><span class="subitem">{{ subitem }}</span></li>
													{% endfor %}
													</ul>
												{% else %}
													<span class="item">{{ item }}</span>
												{% endif %}
											</li>
										{% endfor %}
									</ul>
								{% endif %}
							</div>
						</div>
					</li>
				{% endfor %}
				</ul>
			{% endif %}
			</div>
		</div>
	{% endfor %}
</div>