/*
 *  Copyright (C) 2020 ThePringaos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class ChooseDateValues {
  constructor () {
    // DatePicker settings
    this.monthLimit = 2;
    this.dateTimeInterval = 15;
    this.date = 'Fecha';
    this.time = 'Hora';
    this.dateType = 'Medio';
    this.optionSelect = 'Seleccionar opción';
  }
}

export default new ChooseDateValues();
